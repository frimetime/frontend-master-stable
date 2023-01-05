import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFriendsPage } from './user-friends.page';
import { UserService } from '../user.service';
import { UserFriendsResolver } from './user-friends.resolver';
import { ComponentsModule } from '../../components/components.module';
const routes = [
    {
        path: '',
        component: UserFriendsPage,
        resolve: {
            data: UserFriendsResolver
        }
    }
];
let UserFriendsPageModule = class UserFriendsPageModule {
};
UserFriendsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            IonicModule,
            CommonModule,
            FormsModule,
            ComponentsModule,
            RouterModule.forChild(routes),
        ],
        declarations: [UserFriendsPage],
        providers: [
            UserFriendsResolver,
            UserService
        ]
    })
], UserFriendsPageModule);
export { UserFriendsPageModule };
//# sourceMappingURL=user-friends.module.js.map