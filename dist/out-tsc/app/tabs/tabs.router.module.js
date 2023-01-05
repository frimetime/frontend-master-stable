import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TabsPage } from './tabs.page';
const routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'frime',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../frime/frime.module').then(m => m.FrimePageModule)
                    }
                ]
            },
            {
                path: 'frimelist',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../frimelist/frimelist.module').then(m => m.FrimelistPageModule)
                    }
                ]
            },
            {
                path: 'groups',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../groups/groups.module').then(m => m.GroupsPageModule)
                    }
                ]
            },
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../user/profile/user-profile.module').then(m => m.UserProfilePageModule)
                    },
                    {
                        path: 'friends',
                        loadChildren: () => import('../user/friends/user-friends.module').then(m => m.UserFriendsPageModule)
                    }
                ]
            },
            {
                path: 'notifications',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
                    }
                ]
            },
        ]
    },
    // /app/ redirect
    {
        path: '',
        redirectTo: 'app/forms-and-validations',
        pathMatch: 'full'
    }
];
let TabsPageRoutingModule = class TabsPageRoutingModule {
};
TabsPageRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes), HttpClientModule],
        exports: [RouterModule],
        providers: []
    })
], TabsPageRoutingModule);
export { TabsPageRoutingModule };
//# sourceMappingURL=tabs.router.module.js.map