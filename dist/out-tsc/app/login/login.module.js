import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { ComponentsModule } from '../components/components.module';
const routes = [
    {
        path: '',
        component: LoginPage
    }
];
let LoginPageModule = class LoginPageModule {
};
LoginPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            IonicModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes),
            ComponentsModule,
        ],
        declarations: [LoginPage]
    })
], LoginPageModule);
export { LoginPageModule };
//# sourceMappingURL=login.module.js.map