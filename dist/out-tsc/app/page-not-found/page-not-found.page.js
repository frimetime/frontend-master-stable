import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
let PageNotFound = class PageNotFound {
    constructor(menu) {
        this.menu = menu;
    }
    ngOnInit() {
        this.menu.enable(false);
    }
};
PageNotFound = tslib_1.__decorate([
    Component({
        selector: 'app-page-not-found',
        templateUrl: './page-not-found.page.html',
        styleUrls: [
            './styles/page-not-found.page.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [MenuController])
], PageNotFound);
export { PageNotFound };
//# sourceMappingURL=page-not-found.page.js.map