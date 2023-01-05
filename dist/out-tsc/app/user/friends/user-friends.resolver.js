import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
let UserFriendsResolver = class UserFriendsResolver {
    constructor(userService) {
        this.userService = userService;
    }
    resolve() {
        // const dataSource: Observable<UserFriendsModel> = this.userService.getFriendsDataSource();
        // const dataStore: DataStore<UserFriendsModel> = this.userService.getFriendsStore(dataSource);
        // const dataSource: Observable<any> = this.userService.getUserDataSource();
        // const dataStore: DataStore<UserListModel> = this.userService.getUserDataStore();
        // console.log('resolve: ', dataSource);
        //
        // return dataStore;
        return this.userService.doGetUserList();
    }
};
UserFriendsResolver = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [UserService])
], UserFriendsResolver);
export { UserFriendsResolver };
//# sourceMappingURL=user-friends.resolver.js.map