import * as tslib_1 from "tslib";
import { LoadingController, NavParams, PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { any } from 'codelyzer/util/function';
let VerifyRequestPage = class VerifyRequestPage {
    constructor(router, navParams, popoverController, loadingController, authService) {
        this.router = router;
        this.navParams = navParams;
        this.popoverController = popoverController;
        this.loadingController = loadingController;
        this.authService = authService;
        this.user = any;
        this.errorMessage = '';
        this.successMessage = '';
    }
    ngOnInit() {
        this.user = this.navParams.get('user');
    }
    tryVerifyEmail() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                message: 'Sending...'
            });
            yield loading.present();
            this.authService.doVerifyEmail(this.user).subscribe(res => {
                console.log(res);
                loading.dismiss();
                if (res['code'] === 200) {
                    this.successMessage = res['msg'];
                    setTimeout(() => {
                        this.router.navigate(['/auth/login']);
                    }, 5000);
                }
                else {
                    this.errorMessage = res['msg'];
                }
            }, err => {
                console.log(err);
                loading.dismiss();
                this.errorMessage = err;
            });
        });
    }
};
VerifyRequestPage = tslib_1.__decorate([
    Component({
        selector: 'app-verify-request',
        templateUrl: './verify-request.page.html',
        styleUrls: ['./verify-request.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        NavParams,
        PopoverController,
        LoadingController,
        AuthService])
], VerifyRequestPage);
export { VerifyRequestPage };
//# sourceMappingURL=verify-request.page.js.map