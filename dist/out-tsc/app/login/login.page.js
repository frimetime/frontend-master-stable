import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { VerifyRequestPage } from '../verify-request/verify-request.page';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { NavController, PopoverController } from '@ionic/angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
let LoginPage = class LoginPage {
    constructor(authService, formBuilder, router, fb, googlePlus, loadingController, 
    // private fireAuth: AngularFireAuth,
    nav, popoverController, menuCtrl) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.loadingController = loadingController;
        this.nav = nav;
        this.popoverController = popoverController;
        this.menuCtrl = menuCtrl;
        this.errorMessage = '';
        this.value = 0;
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Please enter a valid email.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' }
            ]
        };
    }
    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.validations_form = this.formBuilder.group({
                email: new FormControl('', Validators.compose([
                    Validators.required,
                ])),
                password: new FormControl('', Validators.compose([
                    Validators.minLength(5),
                    Validators.required
                ])),
            });
            this.loading = yield this.loadingController.create({
                message: 'Connecting ...'
            });
        });
    }
    tryLogin(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                message: 'Login...'
            });
            yield loading.present();
            this.authService.doLogin(value)
                .subscribe(res => {
                console.log(res);
                if (res['code'] === 200) {
                    loading.dismiss();
                    this.errorMessage = '';
                    this.router.navigate(['/app/frime']);
                }
                else if (res['code'] === 205) {
                    loading.dismiss();
                    this.verifyEmail(value.email);
                }
                else if (res['code'] === 401) {
                    loading.dismiss();
                    this.errorMessage = 'Invalid username or password!';
                }
            }, err => {
                loading.dismiss();
                this.errorMessage = err.message;
                console.log(err);
            });
        });
    }
    verifyEmail(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const popover_verify = yield this.popoverController.create({
                component: VerifyRequestPage,
                componentProps: {
                    user: user
                }
            });
            yield popover_verify.present();
        });
    }
    presentLoading(loading) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield loading.present();
        });
    }
    // async doFacebookLogin() {
    //   this.fb.login(['email'])
    //     .then((response: FacebookLoginResponse) => {
    //       this.onLoginSuccess(response);
    //       console.log(response.authResponse.accessToken);
    //     }).catch((error) => {
    //       console.log(error)
    //       alert('error:' + error)
    //     });
    // }
    // onLoginSuccess(res: FacebookLoginResponse) {
    //   //const { token } = res;
    //   const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    //   this.fireAuth.auth.signInWithCredential(credential)
    //     .then((response) => {
    //       this.router.navigate(["app/frime"]);
    //       this.loading.dismiss();
    //     })
    // }
    onLoginError(err) {
        console.log(err);
    }
    goStarted() {
        this.router.navigate(['/getting-started']);
    }
    doGoogleLogin() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                message: 'Login...'
            });
            yield loading.present();
            this.googlePlus.login({})
                .then(user => {
                loading.dismiss();
                console.log(user);
                loading.dismiss();
            }, err => {
                console.log(err);
                loading.dismiss();
            });
        });
    }
    goSignupPage() {
        this.router.navigate(['/auth/signup']);
    }
    goToForgotPassword() {
        console.log('redirect to forgot-password page');
    }
    openPopover2() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const popover = yield this.popoverController.create({
                component: ForgotPasswordPage,
            });
            yield popover.present();
        });
    }
};
LoginPage = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./styles/login.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService,
        FormBuilder,
        Router,
        Facebook,
        GooglePlus,
        LoadingController,
        NavController,
        PopoverController,
        MenuController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map