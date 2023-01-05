import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FrimePage } from './frime.page';
const routes = [
    {
        path: '',
        component: FrimePage
    }
];
let FrimePageModule = class FrimePageModule {
};
FrimePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ReactiveFormsModule
        ],
        declarations: [FrimePage]
    })
], FrimePageModule);
export { FrimePageModule };
//# sourceMappingURL=frime.module.js.map