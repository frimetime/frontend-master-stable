import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import {
  ActionSheetController,
  IonSlides,
  LoadingController,
  MenuController,
  NavController,
  Platform,
  ToastController,
} from "@ionic/angular";

import { File } from "@ionic-native/file/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import {
  Camera,
  CameraOptions,
  PictureSourceType,
} from "@ionic-native/camera/ngx";
import { Storage } from "@ionic/storage";
import { FileUploader, FileLikeObject } from "ng2-file-upload";
import { UserService } from "../user/user.service";
import { any } from "codelyzer/util/function";
import { environment } from "../../environments/environment";
declare var gtag;
const STORAGE_KEY = "my_images";

@Component({
  selector: "app-getting-started",
  templateUrl: "./getting-started.page.html",
  styleUrls: [
    "./styles/getting-started.page.scss",
    "./styles/getting-started.shell.scss",
    "./styles/getting-started.responsive.scss",
  ],
})
export class GettingStartedPage implements OnInit, AfterViewInit {
  images = [];
  profile: any;
  fileToUpload: File = null;
  public fileUploader: FileUploader = new FileUploader({});

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  @HostBinding("class.last-slide-active") isLastSlide = false;

  gettingStartedForm: FormGroup;
  username: any;

  constructor(
    public menu: MenuController,
    public navController: NavController,
    private camera: Camera,
    private file: File,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private storage: Storage,
    private plt: Platform,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath,
    private webView: WebView,
    private user: UserService // public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.slides.slideTo(1, 1000);
  }

  ngOnInit(): void {
    this.slides.slideTo(0);
    this.menu.enable(false);
    this.profile = this.user.profile;
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "getting started page",
      page_path: "/gettingstarted",
    });
  }

  ngAfterViewInit(): void {
    // ViewChild is set
    this.slides.isEnd().then((isEnd) => {
      this.isLastSlide = isEnd;
    });

    // Subscribe to changes
    this.slides.ionSlideWillChange.subscribe((changes) => {
      this.slides.isEnd().then((isEnd) => {
        this.isLastSlide = isEnd;
      });
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
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  // async tryUpload(formData) {
  //   const loading = await this.loadingController.create({
  //     message: 'Uploading...'
  //   });
  //   await loading.present();
  //   this.user.doUpload(formData).subscribe(res => {
  //     loading.dismiss();
  //     console.log(res);
  //   }, err => {
  //     console.log(err);
  //     loading.dismiss();
  //   });
  // }
  pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return this.webView.convertFileSrc(img);
    }
  }
  async presentToast(Text) {
    const toast = await this.toastController.create({
      message: Text,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image from",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }
  takePicture(SourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: SourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imagePath) => {
      if (SourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath).then((filePath) => {
          const correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
          const currentName = imagePath.substring(
            imagePath.lastIndexOf("/") + 1,
            imagePath.lastIndexOf("?")
          );
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        });
      } else {
        const currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
        this.copyFileToLocalDir(
          correctPath,
          currentName,
          this.createFileName()
        );
      }
    });
  }
  createFileName() {
    const d = new Date(),
      n = d.getTime();
    return n + ".jpg";
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
      .then(
        (success) => {
          this.updateStoredImages(newFileName);
        },
        (error) => {
          this.presentToast("Error while storing file.");
        }
      );
  }
  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then((images) => {
      const arr = JSON.parse(images);
      if (!arr) {
        const newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      const filePath = this.file.dataDirectory + name;
      const resPath = this.pathForImage(filePath);

      const newEntry = {
        name: name,
        path: resPath,
        filePath: filePath,
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }
}
