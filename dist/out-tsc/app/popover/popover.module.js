import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PopoverPage } from './popover.page';
const routes = [
    {
        path: '',
        component: PopoverPage
    }
];
let PopoverPageModule = class PopoverPageModule {
};
PopoverPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [PopoverPage]
    })
], PopoverPageModule);
export { PopoverPageModule };
//# sourceMappingURL=popover.module.js.map