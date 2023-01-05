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
import {
  AngularFirestoreModule,
  FirestoreSettingsToken,
} from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { GoogleAnalytics } from "@ionic-native/google-analytics/ngx";

import { FirebaseAnalytics } from "@ionic-native/firebase-analytics/ngx";
import { ImagePicker } from "@ionic-native/image-picker/ngx";

import { BotDetectCaptchaModule } from "angular-captcha";

import * as firebase from "firebase";
import { RecaptchaDirective } from "./recaptcha.directive";
import { Recaptcha1Directive } from "./recaptcha1.directive";

import { PopoverPageModule } from "./popover/popover.module";
import { ForgotPasswordPageModule } from "./forgot-password/forgot-password.module";
import { Platform } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";
import { VerifyRequestPageModule } from "./verify-request/verify-request.module";
import { DeleteAccountPageModule } from './popover/delete-account/delete-account.module';

// Image Process
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { EditProfilePageModule } from "./user/edit-profile/edit-profile.module";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { CommonService } from "./services/common.service";
import { FCM } from "@ionic-native/fcm/ngx";

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdsenseModule } from 'ng2-adsense';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'ng4-social-login';
import { RouteReuseService } from './services/route-reuse-service.service';
import { NgNavigatorShareService } from 'ng-navigator-share';
const SOCAIL_CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('68061989386-mtd27rsm4crofunvirf1c67tsfv2io8d.apps.googleusercontent.com')

    // provider: new GoogleLoginProvider('68061989386-gno3nd3ubm6a6et8jkhjd7kig7t6g0ik.apps.googleusercontent.com')
    // client has to uncomment the below line for their google, OK, for now I will add mine and will put 
    //right URL there to see if its working 
    // can you show where you creat google client app id
    //ys
    // provider: new GoogleLoginProvider('602162997258-fiksbeovu9djdo7sk74a3i8c9p2v7t51.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
     provider: new FacebookLoginProvider('2615920465341657')
   // provider: new FacebookLoginProvider('730488377424140')
  }
], false);

export function provideConfig() {
  return SOCAIL_CONFIG;
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

// @ts-ignore
// @ts-ignore
@NgModule({
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
    DeleteAccountPageModule,
    EditProfilePageModule,
    BotDetectCaptchaModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-6185412474788744',
      adSlot: 7259870550,
    }),
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app
    AngularFireMessagingModule,
    AngularFirestoreModule, // imports firebase/firestore
    AngularFireAuthModule, // imports firebase/auth
    AngularFireStorageModule, // imports firebase/storage
    ServiceWorkerModule.register("combined-sw.js", {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
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
    SocialLoginModule
  ],
  providers: [
    Facebook,
    GooglePlus,
    ImagePicker,
    Platform,
    AuthService,
    FirebaseAnalytics,
    FCM,
    AdMobFree,
    SocialSharing,
    NgNavigatorShareService,
    GoogleAnalytics,
    // { provide: FirestoreSettingsToken, useValue: {} },
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: RouteReuseStrategy, useClass: RouteReuseService },
    Camera,
    File,
    WebView,
    FilePath,
    CommonService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
