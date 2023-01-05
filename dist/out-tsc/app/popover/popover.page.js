import * as tslib_1 from "tslib";
import { NavParams, PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
let PopoverPage = class PopoverPage {
    constructor(navParams, popoverController) {
        this.navParams = navParams;
        this.popoverController = popoverController;
        this.passedId = null;
    }
    ngOnInit() {
        this.passedId = this.navParams.get('custom_id');
    }
    closePopover() {
        this.popoverController.dismiss();
    }
    pendingRequest() { }
};
PopoverPage = tslib_1.__decorate([
    Component({
        selector: 'app-popover',
        templateUrl: './popover.page.html',
        styleUrls: ['./popover.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [NavParams, PopoverController])
], PopoverPage);
export { PopoverPage };
//# sourceMappingURL=popover.page.js.map