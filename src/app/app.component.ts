import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { TranslateService } from "@ngx-translate/core";

import { AuthService } from "./services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginPage } from "./login/login.page";
import { NavController, ModalController, Platform } from "@ionic/angular";
import { error } from "@angular/compiler/src/util";
import { GoogleAnalytics } from "@ionic-native/google-analytics/ngx";
import { firebase } from '@firebase/app';
import { environment } from "../environments/environment";
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { NotificationsService } from './services/notifications.service';
import {  NgZone } from '@angular/core';
import { Item, ApiService } from './services/api.service';

declare var gtag;
const { SplashScreen } = Plugins;


@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: [
    "./side-menu/styles/side-menu.scss",
    "./side-menu/styles/side-menu.shell.scss",
    "./side-menu/styles/side-menu.responsive.scss",
  ],
})
export class AppComponent { // } implements OnInit, OnDestroy {
  @ViewChild("recaptcha", { static: true }) recaptchaElement: ElementRef;
  userEmail: string;
  items: Array<Item>;
  appPages = [
    {
      title: "Profile",
      url: "/app/user",
      icon: "./assets/sample-icons/side-menu/profile.svg",
    },
    {
      title: "Contact Card",
      url: "/contact-card",
      icon: "./assets/sample-icons/side-menu/contact-card.svg",
    },
    {
      title: "Policy",
      url: "/policy",
      icon: "./assets/sample-icons/side-menu/tutorial.svg",
    },
    {
      title: "Frime Feed",
      url: "/app/frimelist",
      icon: "./assets/sample-icons/side-menu/tutorial.svg",
    },
    {
      title: "FrimeChat",
      url: "/chat",
      icon: "./assets/sample-icons/side-menu/contact-card.svg",
    },
    {
      title: "Notifications",
      url: "/app/notifications",
      icon: "./assets/sample-icons/side-menu/notifications.svg",
    },
  ];
  accountPages = [
    {
      title: "Log In",
      url: "/auth/login",
      icon: "./assets/sample-icons/side-menu/login.svg",
    },
    {
      title: "Sign Up",
      url: "/auth/signup",
      icon: "./assets/sample-icons/side-menu/signup.svg",
    },
    {
      title: "Getting Started",
      url: "/getting-started",
      icon: "./assets/sample-icons/side-menu/getting-started.svg",
    },
  ];
  optionPages = [
    {
      title: "Getting Started",
      url: "/getting-started",
      icon: "./assets/sample-icons/side-menu/getting-started.svg",
    },
    {
      title: "Account Settings",
      url: "/settings",
      icon: "./assets/sample-icons/side-menu/login.svg",
    },
    {
      title: "Contact us",
      url: "/contact",
      icon: "./assets/sample-icons/side-menu/signup.svg",
    },
    {
      title: "Impressum",
      url: "/impressum",
      icon: "./assets/sample-icons/side-menu/tutorial.svg",
    },
  ];

  textDir = "ltr";
  //(60 * 1000) = 1 Minute so refreshh token after 20 minutes (20 * 60 * 1000)
  private tokenExpiry: number = (5 * 60 * 1000);
  private remainingTime: number;
  private counter$: Observable<number>;
  private subscription: Subscription;

  
  deferredPrompt: any;
  showButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }
  

  constructor(
    public translate: TranslateService,
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform,
    private storage: Storage,
    private notificationsService: NotificationsService,
    private ga: GoogleAnalytics,
    private apiService: ApiService,
    private _zone: NgZone, /**
    private navController: NavController,
    private splashScreen: any,
    public authenticationService: AuthService
    */
  ) {
    this.loadGoogleAnalytics();
    this.initializeApp();
    this.setLanguage();
    this.setTimerToRefreshToken();
    window['angularComponentRef'] = {
      zone: this._zone,
      componentFn: (deviceId) => this.setDeviceIdInGlobalVariable(deviceId),
      component: this
    };
    /**
    this.authenticationService.authenticationState.subscribe(state => {
                if (state) {
                    console.log("user is logged in");
                    this.navController.navigateRoot(['menu/tabs/dashboard']);
                    this.splashScreen.hide();
                } else {
                    console.log("user is NOT logged in");
                    this.navController.navigateRoot('login');
                    this.splashScreen.hide();
                }
            });
             */
  }
  setDeviceIdInGlobalVariable(deviceId) {
    this.authService._globalserviceVariable = deviceId;
    }
  async ngOnInit() {

    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };

    firebase.initializeApp(environment.firebase);

    await this.notificationsService.init();

    
    this.fetchData();
  }


  ngAfterViewInit() {
    this.platform.ready().then(async () => {
       await this.notificationsService.requestPermission();
    });   
}

  

  ngOnDestroy() {
    // this.storage.clear();
    // this.authService.isLoggedIn = new BehaviorSubject(false);
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
    // this.authService.refreshToken();
  }
  // @HostListener('window:beforeunload')
  // beforeunload() {
  // @HostListener('window:unload', ['$event'])
  // unloadHandler($event) {
  //   this.storage.clear();
  //   this.authService.isLoggedIn = new BehaviorSubject(false);
  //   // this.authService.isLoggedIn.unsubscribe();
  // }
  // logout(){
  //   this.authService.doLogout()
  //   .then(res => {
  //     console.log(res);
  //     this.navCtrl.navigateBack('');
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

  fetchData() {
    this.apiService.fetch().subscribe(
      (data: Array<Item>) => {
        console.log(data);
        this.items = data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  async loadGoogleAnalytics() {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      environment.firebase.trackerID;
    document.head.prepend(script);
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      //Google analytics
      gtag("config", environment.firebase.trackerID, {
        page_title: "App page",
        page_path: "/app",
      });

      this.setTimerToRefreshToken();
      // this.authService.isLoggedIn.subscribe((state) => {
      this.storage.get('token').then((token) => {
        if (token != null && token.length > 0) {
          // if (state) {
          this.authService.isLoggedIn.next(true);
          this.router.navigate(["/app/frime"]);
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
                this.authService.isLoggedIn = new BehaviorSubject(false);
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

    });

    try {
      await SplashScreen.hide();
    } catch (err) {
      console.log("This is normal in a browser", err);
    }
  }

  setTimerToRefreshToken() {
    // this.authService.refreshToken();
    this.remainingTime = this.tokenExpiry;
    // timer to refresh token
    this.counter$ = interval(1000).pipe(
      map((x) => {
        this.remainingTime = this.remainingTime - 1000;
        return this.remainingTime;
      })
    );

    this.subscription = this.counter$.subscribe((x) => {
      if (this.remainingTime <= 0) {
        console.log("Refresh token!")
        this.remainingTime = this.tokenExpiry;
        this.authService.refreshToken()
          .subscribe((res) => {
            if (res['code'] === 200) {
              this.authService.token = res['token'];
              this.authService.userLoggedInSuccessfully();
            }
          }, err => {
            console.log(err);
          });
      }
    });
  }

  setLanguage() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use("en");

    // this is to determine the text direction depending on the selected language
    // for the purpose of this example we determine that only arabic and hebrew are RTL.
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
    // });
  }
  logout() {
    this.authService.doLogout();
    this.router.navigate(["/auth/login"]);
  }


  
}
