import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ImpressumPage } from './impressum.page';
const routes = [
    {
        path: '',
        component: ImpressumPage
    }
];
let ImpressumPageModule = class ImpressumPageModule {
};
ImpressumPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ImpressumPage]
    })
], ImpressumPageModule);
export { ImpressumPageModule };
//# sourceMappingURL=impressum.module.js.map