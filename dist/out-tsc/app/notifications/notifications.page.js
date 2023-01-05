import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
let NotificationsPage = class NotificationsPage {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        if (this.route && this.route.data) {
            this.route.data.subscribe(resolvedData => {
                const dataSource = resolvedData['data'];
                if (dataSource) {
                    dataSource.source.subscribe(pageData => {
                        if (pageData) {
                            this.notifications = pageData;
                        }
                    });
                }
            });
        }
    }
};
NotificationsPage = tslib_1.__decorate([
    Component({
        selector: 'app-notifications',
        templateUrl: './notifications.page.html',
        styleUrls: [
            './styles/notifications.page.scss',
            './styles/notifications.shell.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
], NotificationsPage);
export { NotificationsPage };
//# sourceMappingURL=notifications.page.js.map