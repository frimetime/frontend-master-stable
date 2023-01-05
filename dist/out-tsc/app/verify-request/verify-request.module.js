import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VerifyRequestPage } from './verify-request.page';
import { ComponentsModule } from '../components/components.module';
const routes = [
    {
        path: '',
        component: VerifyRequestPage
    }
];
let VerifyRequestPageModule = class VerifyRequestPageModule {
};
VerifyRequestPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ComponentsModule
        ],
        declarations: [VerifyRequestPage]
    })
], VerifyRequestPageModule);
export { VerifyRequestPageModule };
//# sourceMappingURL=verify-request.module.js.map