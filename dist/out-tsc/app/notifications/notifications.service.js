import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let NotificationsService = class NotificationsService {
    constructor(http) {
        this.http = http;
    }
    getData() {
        return this.http.get('./assets/sample-data/notifications.json');
    }
};
NotificationsService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], NotificationsService);
export { NotificationsService };
//# sourceMappingURL=notifications.service.js.map