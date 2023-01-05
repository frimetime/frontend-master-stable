import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfilePage } from './user-profile.page';
import { UserService } from '../user.service';
import { UserProfileResolver } from './user-profile.resolver';
import { ComponentsModule } from '../../components/components.module';
import { LanguageService } from '../../language/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationsResolver } from '../../notifications/notifications.resolver';
import { NotificationsService } from '../../notifications/notifications.service';
import { FileUploadModule } from 'ng2-file-upload';
const routes = [
    {
        path: '',
        component: UserProfilePage,
        resolve: {
            data: NotificationsResolver
        }
    }
];
let UserProfilePageModule = class UserProfilePageModule {
};
UserProfilePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            IonicModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            ComponentsModule,
            RouterModule.forChild(routes),
            FileUploadModule
        ],
        declarations: [UserProfilePage],
        providers: [
            UserProfileResolver,
            UserService,
            LanguageService,
            NotificationsResolver,
            NotificationsService
        ]
    })
], UserProfilePageModule);
export { UserProfilePageModule };
//# sourceMappingURL=user-profile.module.js.map