import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalPage } from './modal.page';
const routes = [
    {
        path: '',
        component: ModalPage
    }
];
let ModalPageModule = class ModalPageModule {
};
ModalPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ModalPage]
    })
], ModalPageModule);
export { ModalPageModule };
//# sourceMappingURL=modal.module.js.map