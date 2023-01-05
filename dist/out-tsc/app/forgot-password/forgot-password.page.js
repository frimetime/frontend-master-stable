import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
let ForgotPasswordPage = class ForgotPasswordPage {
    constructor(router, menu, authService, loadingController) {
        this.router = router;
        this.menu = menu;
        this.authService = authService;
        this.loadingController = loadingController;
        this.errorMessage = '';
        this.successMessage = '';
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' }
            ]
        };
        this.forgotPasswordForm = new FormGroup({
            'email': new FormControl('test@test.com', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });
    }
    ngOnInit() {
        this.menu.enable(false);
    }
    recoverPassword(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(this.forgotPasswordForm.value);
            const loading = yield this.loadingController.create({
                message: 'Recover Password...'
            });
            yield loading.present();
            this.authService.doRecoverPassword(value)
                .subscribe(res => {
                loading.dismiss();
                console.log(res);
                if (res['code'] === 200) {
                    this.successMessage = res['msg'];
                    this.errorMessage = '';
                    this.router.navigate(['/auth/login']);
                }
                else {
                    this.successMessage = '';
                    this.errorMessage = res['msg'];
                }
            }, err => {
                loading.dismiss();
                this.errorMessage = err;
                this.successMessage = '';
                console.log(err);
            });
        });
    }
};
ForgotPasswordPage = tslib_1.__decorate([
    Component({
        selector: 'app-forgot-password',
        templateUrl: './forgot-password.page.html',
        styleUrls: [
            './styles/forgot-password.page.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        MenuController,
        AuthService,
        LoadingController])
], ForgotPasswordPage);
export { ForgotPasswordPage };
//# sourceMappingURL=forgot-password.page.js.map