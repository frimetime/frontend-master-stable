import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
let UserProfileResolver = class UserProfileResolver {
    constructor(userService) {
        this.userService = userService;
    }
    resolve() {
        const dataSource = this.userService.getProfileDataSource();
        const dataStore = this.userService.getProfileStore(dataSource);
        return dataStore;
    }
};
UserProfileResolver = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [UserService])
], UserProfileResolver);
export { UserProfileResolver };
//# sourceMappingURL=user-profile.resolver.js.map