import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController, NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
let EditProfilePage = class EditProfilePage {
    constructor(navParams, formBuilder, loadingController, router, user) {
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingController = loadingController;
        this.router = router;
        this.user = user;
        this.fieldType = '';
        this.fieldValue = '';
        this.fieldName = '';
        this.errorMessage = '';
        this.successMessage = '';
        this.validations_form = this.formBuilder.group({
            username: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            firstname: new FormControl('', Validators.compose([
                Validators.required
            ])),
            status: new FormControl('', Validators.compose([
                Validators.required
            ])),
        });
    }
    ngOnInit() {
        this.fieldName = this.navParams.get('fieldName');
        this.fieldType = this.navParams.get('fieldType');
        this.fieldValue = this.navParams.get('fieldValue');
    }
    tryUpdateProfile(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                message: 'Updating...'
            });
            yield loading.present();
            if (this.fieldName === 'username') {
                if (value.username === '') {
                    yield loading.dismiss();
                    this.errorMessage = 'Username is required!';
                }
                this.user.doUpdateUserName(value).subscribe(res => {
                    console.log(res);
                    loading.dismiss();
                    if (res['code'] === 200) {
                        this.errorMessage = '';
                        this.successMessage = 'Success!';
                        this.user.profile.username = value.username;
                    }
                    else {
                        this.errorMessage = res['msg'];
                        this.successMessage = '';
                    }
                }, err => {
                    loading.dismiss();
                    this.errorMessage = err;
                    this.successMessage = '';
                });
            }
            else if (this.fieldName === 'status') {
                if (value.status === '') {
                    yield loading.dismiss();
                    this.errorMessage = 'Status is required!';
                }
                this.user.doUpdateStatus(value).subscribe(res => {
                    console.log(res);
                    loading.dismiss();
                    if (res['code'] === 200) {
                        this.errorMessage = '';
                        this.successMessage = 'Success!';
                        this.user.profile.description = value.status;
                    }
                    else {
                        this.errorMessage = res['msg'];
                        this.successMessage = '';
                    }
                }, err => {
                    loading.dismiss();
                    this.errorMessage = err;
                    this.successMessage = '';
                });
            }
            else if (this.fieldName === 'firstname') {
                if (value.firstname === '') {
                    yield loading.dismiss();
                    this.errorMessage = 'FirstName is required!';
                }
                this.user.doUpdateFirstName(value).subscribe(res => {
                    console.log(res);
                    loading.dismiss();
                    if (res['code'] === 200) {
                        this.errorMessage = '';
                        this.successMessage = 'Success!';
                        this.user.profile.firstname = value.firstname;
                    }
                    else {
                        this.errorMessage = res['msg'];
                        this.successMessage = '';
                    }
                }, err => {
                    loading.dismiss();
                    this.errorMessage = err;
                    this.successMessage = '';
                });
            }
        });
    }
};
EditProfilePage = tslib_1.__decorate([
    Component({
        selector: 'app-edit-profile',
        templateUrl: './edit-profile.page.html',
        styleUrls: ['./edit-profile.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [NavParams,
        FormBuilder,
        LoadingController,
        Router,
        UserService])
], EditProfilePage);
export { EditProfilePage };
//# sourceMappingURL=edit-profile.page.js.map