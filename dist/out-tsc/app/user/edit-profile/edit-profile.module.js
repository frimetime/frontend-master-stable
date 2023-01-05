import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditProfilePage } from './edit-profile.page';
const routes = [
    {
        path: '',
        component: EditProfilePage
    }
];
let EditProfilePageModule = class EditProfilePageModule {
};
EditProfilePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ReactiveFormsModule,
        ],
        declarations: [EditProfilePage]
    })
], EditProfilePageModule);
export { EditProfilePageModule };
//# sourceMappingURL=edit-profile.module.js.map