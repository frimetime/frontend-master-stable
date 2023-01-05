import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TermsPage } from './terms.page';
const routes = [
    {
        path: '',
        component: TermsPage
    }
];
let TermsPageModule = class TermsPageModule {
};
TermsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [TermsPage]
    })
], TermsPageModule);
export { TermsPageModule };
//# sourceMappingURL=terms.module.js.map