import { Todo, TodoService } from "../services/todo.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, NavController, PopoverController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from "firebase";
import { AuthService } from "../services/auth.service";
import { Storage } from '@ionic/storage';

import { NotipopupPage } from "../notipopup/notipopup.page";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { GoogleAnalytics } from "@ionic-native/google-analytics/ngx";
import { environment } from "../../environments/environment";
declare var gtag;
@Component({
  selector: "app-frime",
  templateUrl: "./frime.page.html",
  styleUrls: ["./frime.page.scss"],
})
export class FrimePage implements OnInit {
  public userId: any;
  public userDoc: any;
  errorMessage = "";
  validations_form: FormGroup;

  validation_messages = {
    name: [{ type: "required", message: "Frime Name is required" }],
    description: [{ type: "required", message: "Description is required." }],
    startDate: [{ type: "required", message: "Start Date is required." }],
    startTime: [{ type: "required", message: "Start Time is required." }],
  };

  public owner: any;

  todoId = null;

  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    private route: ActivatedRoute,    
    private popoverController: PopoverController,
    private loadingController: LoadingController,
    private nav: NavController,
    private afAuth: AngularFireAuth,
    private fireStore: AngularFireStorageModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private ga: GoogleAnalytics,
    private afMessaging: AngularFireMessaging,
    private storage: Storage,
  ) {
    // this.afAuth.authState.subscribe(user => {
    //   this.userId = user.uid;
    //   console.log('userID stored correct? ', this.userId);
    // });
    this.validations_form = this.formBuilder.group({
      title: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl("",Validators.compose([Validators.required])),
      startDate: new FormControl("", Validators.compose([Validators.required])),
      startTime: new FormControl("", Validators.compose([Validators.required])),
      guests: new FormControl("", Validators.compose([Validators.required])),
    });
  }
  frime: Todo = {
    owner: "",
    title: "",
    message: "",
    date: "",
    time: "",
    guests: "",
  };

  ngOnInit() {
    this.todoId = this.route.snapshot.params["id"];
    if (this.todoId) {
      this.loadTodo();
    }
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "frime page",
      page_path: "/frime",
    });
  }
  

  async loadTodo() {
    // const loading = await this.loadingController.create({
    //   message: "Loading Frimes...",
    // });
    // await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(
      (res) => {
        // loading.dismiss();
        console.log(res);
        if (res["code"] === 200) {
        } else if (res["code"] === 205) {
        } else if (res["code"] === 401) {
        }
      },
      (err) => {
        //this.errorMessage = err.message;
        console.log(err);
      }
    );
  }
  async saveTodo(value) {
    const loading = await this.loadingController.create({
      message: "Saving your Frime...",
    });
    await loading.present();
    if (this.todoId) {
      this.frime.date = this.convertDateTimeintoUTC(this.frime.date);
      this.frime.time = this.convertDateTimeintoUTC(this.frime.time);
      this.todoService.updateTodo(this.frime, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateBack("app/frimelist");
      });
    } else {
      value.startDate = this.convertDateTimeintoUTC(value.startDate);
      value.startTime = this.convertDateTimeintoUTC(value.startTime);
      // loading.dismiss();
      this.todoService.addTodo(value).subscribe(
        (res) => {
          loading.dismiss();
          console.log(res);
          if (res["code"].toString() == "200") {
            this.validations_form.reset();
            this.nav.navigateBack("app/frimelist");
          } else {
            if (typeof res["msg"] === "string") {
              this.errorMessage = res["msg"];
            } else {
              this.errorMessage = "Server error, please contact with support!";
            }
          }
        },
        (err) => {
          loading.dismiss();
          if (err['status'] === 401) {
            this.storage.get('token').then((token) => {
              if (token != null && token.length > 0) {
                // if (state) {
                this.authService.isLoggedIn.next(true);
               // this.router.navigate(["/app/frime"]);
                this.authService.refreshToken()
                  .subscribe((res) => {
                    if (res['code'] === 200) {
                      this.authService.token = res['token'];
                      this.authService.userLoggedInSuccessfully();
                    }
                  }, err => {
                    console.log(err);
                    if ((err.status == 401 || err.statusText == 'Unauthorized')) {
                      // this.navigationSubscription.unsubscribe();
                      //this.authService.isLoggedIn = new BehaviorSubject(false);
                      // this.authService.doLogout();
                      this.storage.clear();
                      this.authService.storage.clear();
                      this.router.navigate(["auth/login"]);
                    }
                  });
              } else {
                this.router.navigate(["auth/login"]);
              }
            }, (err) => {
              console.log(err);
              this.router.navigate(["auth/login"]);
            });
          }
          // this.validations_form.reset();
          // this.router.navigate(["auth/login"]);
        }
      );
    }
  }
  requestPushNotificationsPermission() { // requesting permission
    this.afMessaging.requestToken // getting tokens
      .subscribe(
        (token) => { // USER-REQUESTED-TOKEN
          console.log('Permission granted! Save to the server!', token);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  async callNotification() {
    const popover = await this.popoverController.create({
      component: NotipopupPage,
      componentProps: {
      },
    });
        
    popover.present();
    
  }


  // convertDateintoUTC(): string {
  //   // console.log(this.frime.time);
  //   const localDateTime = new Date(this.frime.date);
  //   //2020-06-20T01:46:42.358+05:00
  //   let strUTC = localDateTime.getUTCFullYear().toString() + '-';
  //   strUTC += this.convert2digitNumberSting(localDateTime.getUTCMonth() + 1) + '-';
  //   strUTC += this.convert2digitNumberSting(localDateTime.getUTCDate()) + 'T';
  //   strUTC += this.convert2digitNumberSting(localDateTime.getUTCHours()) + ':';
  //   strUTC += this.convert2digitNumberSting(localDateTime.getUTCMinutes()) + ':';
  //   strUTC += this.convert2digitNumberSting(localDateTime.getUTCSeconds()) + '.000';
  //   // console.log(localDateTime.toUTCString());
  //   // console.log(strUTC);
  //   return strUTC;
  // }

  convertDateTimeintoUTC(strDateTime: string): string {
    // console.log(this.frime.time);
    const localDateTime = new Date(strDateTime);
    //2020-06-20T01:46:42.358+05:00
    let strUTC = localDateTime.getUTCFullYear().toString() + '-';
    strUTC += this.convert2digitNumberSting(localDateTime.getUTCMonth() + 1) + '-';
    strUTC += this.convert2digitNumberSting(localDateTime.getUTCDate()) + 'T';
    strUTC += this.convert2digitNumberSting(localDateTime.getUTCHours()) + ':';
    strUTC += this.convert2digitNumberSting(localDateTime.getUTCMinutes()) + ':';
    strUTC += this.convert2digitNumberSting(localDateTime.getUTCSeconds()) + '.000';
    // console.log(localDateTime.toUTCString());
    // console.log(strUTC);
    return strUTC;
  }

  convert2digitNumberSting(digit: number) {
    const strDigitWithPrefix = '00' + digit.toString();
    return (strDigitWithPrefix).substr(strDigitWithPrefix.length - 2, 2);
  }
}
