import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { ForgotPasswordPage } from './forgot-password.page';
const routes = [
    {
        path: '',
        component: ForgotPasswordPage
    }
];
let ForgotPasswordPageModule = class ForgotPasswordPageModule {
};
ForgotPasswordPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ComponentsModule
        ],
        declarations: [ForgotPasswordPage]
    })
], ForgotPasswordPageModule);
export { ForgotPasswordPageModule };
//# sourceMappingURL=forgot-password.module.js.map