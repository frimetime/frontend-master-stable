import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { FrimelistPage } from './frimelist.page';
import { NotificationsResolver } from '../notifications/notifications.resolver';
import { NotificationsService } from '../notifications/notifications.service';
const routes = [
    {
        path: '',
        component: FrimelistPage
    }
];
let FrimelistPageModule = class FrimelistPageModule {
};
FrimelistPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            IonicModule,
            CommonModule,
            FormsModule,
            ComponentsModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: FrimelistPage,
                    resolve: {
                        data: NotificationsResolver
                    }
                }
            ])
        ],
        declarations: [FrimelistPage],
        providers: [
            NotificationsResolver,
            NotificationsService
        ]
    })
], FrimelistPageModule);
export { FrimelistPageModule };
//# sourceMappingURL=frimelist.module.js.map