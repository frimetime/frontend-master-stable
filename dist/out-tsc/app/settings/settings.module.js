import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SettingsPage } from './settings.page';
import { UserService } from '../user/user.service';
const routes = [
    {
        path: '',
        component: SettingsPage
    }
];
let SettingsPageModule = class SettingsPageModule {
};
SettingsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ReactiveFormsModule
        ],
        declarations: [SettingsPage],
        providers: [UserService]
    })
], SettingsPageModule);
export { SettingsPageModule };
//# sourceMappingURL=settings.module.js.map