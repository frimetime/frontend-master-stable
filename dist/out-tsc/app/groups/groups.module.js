import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GroupsPage } from './groups.page';
const routes = [
    {
        path: '',
        component: GroupsPage
    }
];
let GroupsPageModule = class GroupsPageModule {
};
GroupsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [GroupsPage]
    })
], GroupsPageModule);
export { GroupsPageModule };
//# sourceMappingURL=groups.module.js.map