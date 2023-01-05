import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
let TabsPage = class TabsPage {
    constructor(menu) {
        this.menu = menu;
    }
    ionViewWillEnter() {
        this.menu.enable(true);
    }
};
TabsPage = tslib_1.__decorate([
    Component({
        selector: 'app-tabs',
        templateUrl: 'tabs.page.html',
        styleUrls: [
            './styles/tabs.page.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [MenuController])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map