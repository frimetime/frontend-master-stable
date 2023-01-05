import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';
let NotificationsResolver = class NotificationsResolver {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    resolve() {
        // Base Observable (where we get data from)
        const dataObservable = this.notificationsService.getData();
        return { source: dataObservable };
    }
};
NotificationsResolver = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [NotificationsService])
], NotificationsResolver);
export { NotificationsResolver };
//# sourceMappingURL=notifications.resolver.js.map