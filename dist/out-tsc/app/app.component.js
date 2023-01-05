import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

let AppComponent = class AppComponent {
    constructor(translate, navCtrl, authService, router, route,) {
        
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.platform = platform;
        this.appPages = [
            {
                title: 'Profile',
                url: '/app/user',
                icon: './assets/sample-icons/side-menu/profile.svg'
            },
            {
                title: 'Contact Card',
                url: '/contact-card',
                icon: './assets/sample-icons/side-menu/contact-card.svg'
            },
            {
                title: 'Policy',
                url: '/policy',
                icon: './assets/sample-icons/side-menu/tutorial.svg'
            },
            {
                title: 'Frime Feed',
                url: '/app/frimelist',
                icon: './assets/sample-icons/side-menu/tutorial.svg'
            },
            {
                title: 'FrimeChat',
                url: '/chat',
                icon: './assets/sample-icons/side-menu/contact-card.svg'
            },
            {
                title: 'Notifications',
                url: '/app/notifications',
                icon: './assets/sample-icons/side-menu/notifications.svg'
            }
        ];
        this.accountPages = [
            {
                title: 'Log In',
                url: '/auth/login',
                icon: './assets/sample-icons/side-menu/login.svg'
            },
            {
                title: 'Sign Up',
                url: '/auth/signup',
                icon: './assets/sample-icons/side-menu/signup.svg'
            },
            {
                title: 'Getting Started',
                url: '/getting-started',
                icon: './assets/sample-icons/side-menu/getting-started.svg'
            }
        ];
        this.optionPages = [
            {
                title: 'Getting Started',
                url: '/getting-started',
                icon: './assets/sample-icons/side-menu/getting-started.svg'
            },
            {
                title: 'Account Settings',
                url: '/settings',
                icon: './assets/sample-icons/side-menu/login.svg'
            },
            {
                title: 'Contact us',
                url: '/contact',
                icon: './assets/sample-icons/side-menu/signup.svg'
            },
            {
                title: 'Impressum',
                url: '/impressum',
                icon: './assets/sample-icons/side-menu/tutorial.svg'
            }
        ];
        this.textDir = 'ltr';
        this.initializeApp();
        this.setLanguage();
       
      
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
    initializeApp() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.platform.ready().then(() => {
                this.authService.isLoggedIn.subscribe(state => {
                    if (state) {
                        this.router.navigate(['/app/frime']);
                    }
                    else {
                        this.router.navigate(['auth/login']);
                    }
                });
            });
            try {
                yield SplashScreen.hide();
            }
            catch (err) {
                console.log('This is normal in a browser', err);
            }
        });
    }
    setLanguage() {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use('en');
        // this is to determine the text direction depending on the selected language
        // for the purpose of this example we determine that only arabic and hebrew are RTL.
        // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        //   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
        // });
    }
    logout() {
        this.authService.doLogout();
        this.router.navigate(['/auth/login']);
    }
};
tslib_1.__decorate([
    ViewChild('recaptcha', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], AppComponent.prototype, "recaptchaElement", void 0);
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: 'app.component.html',
        styleUrls: [
            './side-menu/styles/side-menu.scss',
            './side-menu/styles/side-menu.shell.scss',
            './side-menu/styles/side-menu.responsive.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService,
        NavController,
        AuthService,
        Router,
        ActivatedRoute,
        Platform])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map