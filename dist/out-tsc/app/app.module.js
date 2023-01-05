import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AuthService } from "./services/auth.service";
import { AngularFireModule } from "@angular/fire";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { Facebook } from "@ionic-native/facebook/ngx";
import { AngularFirestoreModule, } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { BotDetectCaptchaModule } from "angular-captcha";
import { RecaptchaDirective } from "./recaptcha.directive";
import { Recaptcha1Directive } from "./recaptcha1.directive";
import { PopoverPageModule } from "./popover/popover.module";
import { ForgotPasswordPageModule } from "./forgot-password/forgot-password.module";
import { Platform } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";
import { VerifyRequestPageModule } from "./verify-request/verify-request.module";
// Image Process
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { EditProfilePageModule } from "./user/edit-profile/edit-profile.module";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
// @ts-ignore
// @ts-ignore
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [AppComponent, RecaptchaDirective, Recaptcha1Directive],
        imports: [
            BrowserModule,
            IonicModule.forRoot(),
            FormsModule,
            ReactiveFormsModule,
            AppRoutingModule,
            PopoverPageModule,
            ForgotPasswordPageModule,
            VerifyRequestPageModule,
            EditProfilePageModule,
            BotDetectCaptchaModule,
            ComponentsModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireMessagingModule,
            AngularFirestoreModule,
            AngularFireAuthModule,
            AngularFireStorageModule,
            ServiceWorkerModule.register("combined-sw.js", {
                enabled: environment.production,
            }),
            HttpClientModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient],
                },
            }),
            IonicStorageModule.forRoot(),
        ],
        providers: [
            Facebook,
            GooglePlus,
            ImagePicker,
            Platform,
            AuthService,
            // { provide: FirestoreSettingsToken, useValue: {} },
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            Camera,
            File,
            WebView,
            FilePath,
        ],
        bootstrap: [AppComponent],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map