import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController, PopoverController } from '@ionic/angular';
import { LanguageService } from '../../language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { TodoService } from '../../services/todo.service';
import { PopoverPage } from '../../popover/popover.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { FileUploader } from 'ng2-file-upload';
let UserProfilePage = class UserProfilePage {
    // @HostBinding('class.is-shell') get isShell() {
    //   return (this.profile && this.profile.isShell) ? true : false;
    // }
    // @ViewChild()
    constructor(todoService, route, translate, languageService, alertController, afs, afAuth, popoverController, loadingController, user) {
        this.todoService = todoService;
        this.route = route;
        this.translate = translate;
        this.languageService = languageService;
        this.alertController = alertController;
        this.afs = afs;
        this.afAuth = afAuth;
        this.popoverController = popoverController;
        this.loadingController = loadingController;
        this.user = user;
        this.available_languages = [];
        this.images = [];
        this.fileToUpload = null;
        this.fileUploader = new FileUploader({});
        // const posts = afs.doc(`users/${user.getUID()}`)
        // this.userPosts = posts.valueChanges()
        this.afAuth.authState.subscribe(user => {
            this.userId = user.uid;
            console.log('userID stored correct? ', this.userId);
        });
        this.profile = user.profile;
        console.log(this.profile);
    }
    ngOnInit() {
        this.todoService.getTodos().subscribe(res => {
            this.todos = res;
            console.log(this.todos, 'this value i need?');
            /* loading all events, now seperating it by invited/part of, new frames (maybe joinable etc)*/
        });
        if (this.route && this.route.data) {
            this.route.data.subscribe(resolvedData => {
                const dataSource = resolvedData['data'];
                if (dataSource) {
                    dataSource.source.subscribe(pageData => {
                        if (pageData) {
                            this.notifications = pageData;
                        }
                    });
                }
            });
        }
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
    cancelUpdateProfile() {
        this.images = [];
    }
    remove(item) {
        this.todoService.removeTodo(item.id);
    }
    editProfile(profileField, fieldType, fieldValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(profileField);
            const editProfilePop = yield this.popoverController.create({
                component: EditProfilePage,
                componentProps: {
                    fieldName: profileField,
                    fieldType: fieldType,
                    fieldValue: fieldValue
                }
            });
            yield editProfilePop.present();
        });
    }
    openPopover() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const popover = yield this.popoverController.create({
                component: PopoverPage,
                componentProps: {
                    custom_id: this.value
                },
            });
            popover.present();
        });
    }
    getTranslations() {
        // get translations for this page to use in the Language Chooser Alert
        this.translate.getTranslation(this.translate.currentLang)
            .subscribe((translations) => {
            this.translations = translations;
        });
    }
    openLanguageChooser() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.available_languages = this.languageService.getLanguages()
                .map(item => ({
                name: item.name,
                type: 'radio',
                label: item.name,
                value: item.code,
                checked: item.code === this.translate.currentLang
            }));
            const alert = yield this.alertController.create({
                header: this.translations.SELECT_LANGUAGE,
                inputs: this.available_languages,
                cssClass: 'language-alert',
                buttons: [
                    {
                        text: this.translations.CANCEL,
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => { }
                    }, {
                        text: this.translations.OK,
                        handler: (data) => {
                            if (data) {
                                this.translate.use(data);
                            }
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
};
UserProfilePage = tslib_1.__decorate([
    Component({
        selector: 'app-user-profile',
        templateUrl: './user-profile.page.html',
        styleUrls: [
            './styles/user-profile.page.scss',
            './styles/user-profile.shell.scss',
            './styles/user-profile.ios.scss',
            './styles/user-profile.md.scss'
        ],
    }),
    tslib_1.__metadata("design:paramtypes", [TodoService,
        ActivatedRoute,
        TranslateService,
        LanguageService,
        AlertController,
        AngularFirestore,
        AngularFireAuth,
        PopoverController,
        LoadingController,
        UserService])
], UserProfilePage);
export { UserProfilePage };
//# sourceMappingURL=user-profile.page.js.map