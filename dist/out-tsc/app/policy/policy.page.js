import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from "@angular/common";
let PolicyPage = class PolicyPage {
    constructor(location) {
        this.location = location;
    }
    ngOnInit() {
    }
    myBackButton() {
        this.location.back();
    }
};
PolicyPage = tslib_1.__decorate([
    Component({
        selector: 'app-policy',
        templateUrl: './policy.page.html',
        styleUrls: ['./policy.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Location])
], PolicyPage);
export { PolicyPage };
//# sourceMappingURL=policy.page.js.map