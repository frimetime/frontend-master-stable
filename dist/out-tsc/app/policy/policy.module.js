import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PolicyPage } from './policy.page';
const routes = [
    {
        path: '',
        component: PolicyPage
    }
];
let PolicyPageModule = class PolicyPageModule {
};
PolicyPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [PolicyPage]
    })
], PolicyPageModule);
export { PolicyPageModule };
//# sourceMappingURL=policy.module.js.map