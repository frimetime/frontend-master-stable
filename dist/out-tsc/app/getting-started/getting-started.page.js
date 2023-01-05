import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, HostBinding, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, LoadingController, MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../user/user.service';
const STORAGE_KEY = 'my_images';
let GettingStartedPage = class GettingStartedPage {
    constructor(menu, navController, camera, file, actionSheetController, toastController, storage, plt, loadingController, ref, filePath, webView, user
    // public navParams: NavParams
    ) {
        this.menu = menu;
        this.navController = navController;
        this.camera = camera;
        this.file = file;
        this.actionSheetController = actionSheetController;
        this.toastController = toastController;
        this.storage = storage;
        this.plt = plt;
        this.loadingController = loadingController;
        this.ref = ref;
        this.filePath = filePath;
        this.webView = webView;
        this.user = user;
        this.images = [];
        this.fileToUpload = null;
        this.fileUploader = new FileUploader({});
        this.isLastSlide = false;
    }
    ionViewDidLoad() {
        this.slides.slideTo(1, 1000);
    }
    ngOnInit() {
        this.slides.slideTo(0);
        this.menu.enable(false);
        this.profile = this.user.profile;
    }
    ngAfterViewInit() {
        // ViewChild is set
        this.slides.isEnd().then(isEnd => {
            this.isLastSlide = isEnd;
        });
        // Subscribe to changes
        this.slides.ionSlideWillChange.subscribe(changes => {
            this.slides.isEnd().then(isEnd => {
                this.isLastSlide = isEnd;
            });
        });
    }
    showImage(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            // tslint:disable-next-line:no-shadowed-variable
            reader.onload = (event) => {
                this.images = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        this.fileToUpload = event.target.files[0];
    }
    getFiles() {
        return this.fileUploader.queue.map((fileItem) => {
            return fileItem.file;
        });
    }
    uploadFile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const files = this.getFiles();
            const requests = [];
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('image', file.rawFile, file.name);
            });
            formData.append('firstname', 'asdfa');
            const loading = yield this.loadingController.create({
                message: 'Uploading...'
            });
            yield loading.present();
            this.user.doUpload(this.fileToUpload).subscribe(res => {
                loading.dismiss();
                console.log('ddd', res);
            }, err => {
                console.log(err);
                loading.dismiss();
            });
        });
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
            return '';
        }
        else {
            return this.webView.convertFileSrc(img);
        }
    }
    presentToast(Text) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: Text,
                position: 'bottom',
                duration: 3000
            });
            toast.present();
        });
    }
    selectImage() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: 'Select Image from',
                buttons: [{
                        text: 'Load from Library',
                        handler: () => {
                            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                        }
                    },
                    {
                        text: 'Use Camera',
                        handler: () => {
                            this.takePicture(this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }]
            });
            yield actionSheet.present();
        });
    }
    takePicture(SourceType) {
        const options = {
            quality: 100,
            sourceType: SourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(imagePath => {
            if (SourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                    const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
            }
            else {
                const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        });
    }
    createFileName() {
        const d = new Date(), n = d.getTime();
        return n + '.jpg';
    }
    copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
            this.updateStoredImages(newFileName);
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }
    updateStoredImages(name) {
        this.storage.get(STORAGE_KEY).then(images => {
            const arr = JSON.parse(images);
            if (!arr) {
                const newImages = [name];
                this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
            }
            else {
                arr.push(name);
                this.storage.set(STORAGE_KEY, JSON.stringify(arr));
            }
            const filePath = this.file.dataDirectory + name;
            const resPath = this.pathForImage(filePath);
            const newEntry = {
                name: name,
                path: resPath,
                filePath: filePath
            };
            this.images = [newEntry, ...this.images];
            this.ref.detectChanges(); // trigger change detection cycle
        });
    }
};
tslib_1.__decorate([
    ViewChild(IonSlides, { static: true }),
    tslib_1.__metadata("design:type", IonSlides)
], GettingStartedPage.prototype, "slides", void 0);
tslib_1.__decorate([
    HostBinding('class.last-slide-active'),
    tslib_1.__metadata("design:type", Object)
], GettingStartedPage.prototype, "isLastSlide", void 0);
GettingStartedPage = tslib_1.__decorate([
    Component({
        selector: 'app-getting-started',
        templateUrl: './getting-started.page.html',
        styleUrls: [
            './styles/getting-started.page.scss',
            './styles/getting-started.shell.scss',
            './styles/getting-started.responsive.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [MenuController,
        NavController,
        Camera,
        File,
        ActionSheetController,
        ToastController,
        Storage,
        Platform,
        LoadingController,
        ChangeDetectorRef,
        FilePath,
        WebView,
        UserService
        // public navParams: NavParams
    ])
], GettingStartedPage);
export { GettingStartedPage };
//# sourceMappingURL=getting-started.page.js.map