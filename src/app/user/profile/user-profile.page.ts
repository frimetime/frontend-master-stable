import { Component, OnInit, HostBinding, ViewChild } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { LoadingController } from "@ionic/angular";


import { UserProfileModel } from "./user-profile.model";
import { Profile } from "./userProfile";
import {
  AlertController,
  NavController,
  PopoverController,
} from "@ionic/angular";

import { LanguageService } from "../../language/language.service";
import { TranslateService } from "@ngx-translate/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { UserService } from "../user.service";

import { Todo, TodoService } from "../../services/todo.service";
import { PopoverPage } from "../../popover/popover.page";
import { AngularFireAuth } from "@angular/fire/auth";
import { EditProfilePage } from "../edit-profile/edit-profile.page";
import { File } from "@ionic-native/file/ngx";
import { FileUploader, FileLikeObject } from "ng2-file-upload";
import { CommonService } from "../../services/common.service";
import { environment } from "../../../environments/environment";
import { Subscription } from 'rxjs';
import { AuthService } from '..//../services/auth.service';
declare var gtag;

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.page.html",
  styleUrls: [
    "./styles/user-profile.page.scss",
    "./styles/user-profile.shell.scss",
    "./styles/user-profile.ios.scss",
    "./styles/user-profile.md.scss",
  ],
})
export class UserProfilePage implements OnInit {
  profile: any;
  available_languages = [];
  translations;
  todos: any[];
  notifications: any[];
  private userId: any;
  value: 0;

  images = [];
  fileToUpload: File = null;
  public fileUploader: FileUploader = new FileUploader({});
  private navigationSubscription: Subscription;

  // @HostBinding('class.is-shell') get isShell() {
  //   return (this.profile && this.profile.isShell) ? true : false;
  // }
  // @ViewChild()
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public languageService: LanguageService,
    public alertController: AlertController,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private popoverController: PopoverController,
    private loadingController: LoadingController,
    private user: UserService,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService, 
  ) {
    // const posts = afs.doc(`users/${user.getUID()}`)
    // this.userPosts = posts.valueChanges()
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        console.log("userID stored correct? ", this.userId);
      }
    });
    this.profile = user.profile;
    console.log(this.profile);
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd && e.url == '/app/user') {
        this.user.doGetProfile().subscribe(res => {

          if (res['code'] === 200) {
            const userData = res['data'];
            this.profile.id = userData['id'];
            this.profile.username = userData['username'];
            this.profile.email = userData['email'];
            this.profile.country = userData['country'];
            this.profile.role = userData['role'];
            this.profile.sex = userData['role'];
            this.profile.birthdate = userData['birthday'];
            if (userData['description']) {
              this.profile.description = userData['description'];
            }
            this.profile.image = userData['image'];
            this.getTodos();
          } else {
            // authService.doLogout();
          }
        }, err => {
          // loading.dismiss();
          console.log(err);
         
        });
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });

    // if (this.route && this.route.data) {
    //   this.route.data.subscribe((resolvedData) => {
    //     const dataSource = resolvedData["data"];
    //     if (dataSource) {
    //       dataSource.source.subscribe((pageData) => {
    //         if (pageData) {
    //           this.notifications = pageData;
    //         }
    //       });
    //     }
    //   });
    // }
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "user profile page",
      page_path: "/userprofile",
    });
  }
  formatAMPM(d) {
    let dd = d + " UTC";
    let date = new Date(dd);
    //var date = new date(d);
   var hours = date.getHours();
   var minutes = date.getMinutes();
   var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var min = minutes < 10 ? '0'+minutes : minutes;
   var strTime = hours + ':' + min + ' ' + ampm;
   return strTime;
 }


  getTodos() {
    this.todoService.getTodos().subscribe(res => {
      // this.todos = res;
      // console.log(this.todos, 'this value i need?');
      // /* loading all events, now seperating it by invited/part of, new frames (maybe joinable etc)*/
      console.log(res);
      if (res['code'] === 200) {
        console.log(res['data']);
        const userFrimes: any[] = res['data'];
        this.todos = [] as any[];
        this.notifications = [] as any[];
        if (userFrimes && userFrimes.length > 0) {
          userFrimes.forEach(uf => {
            var timeofFrime=this.formatAMPM(uf.start_at);
            let frime = {
              owner: this.profile.username,
              title: uf.title,
              message: uf.description,
              date: uf.start_at, //new Date(uf.start_at + ".000000Z").toLocaleDateString(),
              time: timeofFrime, 
              max: uf.max,
              guests:uf.member.length,// uf.guests == null ? 0 : uf.guests,
              frime_id: uf.id,
              status: uf.status,
              user_id: uf.user_id,
              image: ''
            };

            if (this.todoService.isFrimeExpired(uf.start_at)) {
              this.notifications.push(frime);
            } else {
              this.todos.push(frime);
            }
          });
        }
      } else if (res['code'] === 205) {

      } else if (res['code'] === 401) {

      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });

  }

  showImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.images = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.fileToUpload = event.target.files[0];
  }

  cancelUpdateProfile() {
    this.images = [];
  }

  remove(item) {
    this.todoService.removeTodo(item.id);
  }

  async editProfile(profileField, fieldType, fieldValue) {
    console.log(profileField);
    const editProfilePop = await this.popoverController.create({
      component: EditProfilePage,
      componentProps: {
        fieldName: profileField,
        fieldType: fieldType,
        fieldValue: fieldValue,
      },
    });
    await editProfilePop.present();
  }

  async openPopover() {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      componentProps: {
        custom_id: this.value,
      },
    });

    popover.present();
  }

  getTranslations() {
    // get translations for this page to use in the Language Chooser Alert
    this.translate
      .getTranslation(this.translate.currentLang)
      .subscribe((translations) => {
        this.translations = translations;
      });
  }

  async openLanguageChooser() {
    this.available_languages = this.languageService
      .getLanguages()
      .map((item) => ({
        name: item.name,
        type: "radio",
        label: item.name,
        value: item.code,
        checked: item.code === this.translate.currentLang,
      }));

    const alert = await this.alertController.create({
      header: this.translations.SELECT_LANGUAGE,
      inputs: this.available_languages,
      cssClass: "language-alert",
      buttons: [
        {
          text: this.translations.CANCEL,
          role: "cancel",
          cssClass: "secondary",
          handler: () => { },
        },
        {
          text: this.translations.OK,
          handler: (data) => {
            if (data) {
              this.translate.use(data);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  async uploadFile() {
    const files = this.getFiles();
    const requests = [];
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file.rawFile, file.name);
    });
    formData.append("firstname", "asdfa");
    const loading = await this.loadingController.create({
      message: "Uploading...",
    });
    await loading.present();
    this.user.doUpload(this.fileToUpload).subscribe(
      (res) => {
        loading.dismiss();
        console.log("ddd", res);
        this.images = [];

        if (res["code"] === 200) {
          const userData = res["data"];
          this.profile.id = userData["id"];
          this.profile.username = userData["username"];
          this.profile.email = userData["email"];
          this.profile.country = userData["country"];
          this.profile.role = userData["role"];
          this.profile.sex = userData["role"];
          this.profile.birthdate = userData["birthday"];
          if (userData["description"]) {
            this.profile.description = userData["description"];
          }
          this.profile.image = userData["image"];
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async openChat(event, item) {
    this.commonService.selected_frime = item;
    this.commonService.current_user = this.profile;
    this.router.navigate(["/chat"]);
  }
}
