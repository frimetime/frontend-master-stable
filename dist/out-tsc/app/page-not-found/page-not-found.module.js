import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PageNotFound } from './page-not-found.page';
let PageNotFoundModule = class PageNotFoundModule {
};
PageNotFoundModule = tslib_1.__decorate([
    NgModule({
        imports: [
            IonicModule,
            CommonModule,
            ComponentsModule,
            FormsModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: PageNotFound
                }
            ])
        ],
        declarations: [PageNotFound]
    })
], PageNotFoundModule);
export { PageNotFoundModule };
//# sourceMappingURL=page-not-found.module.js.map