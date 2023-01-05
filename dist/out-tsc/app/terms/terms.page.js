import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
let TermsPage = class TermsPage {
    constructor(location) {
        this.location = location;
    }
    ngOnInit() {
    }
    myBackButton() {
        this.location.back();
    }
};
TermsPage = tslib_1.__decorate([
    Component({
        selector: 'app-terms',
        templateUrl: './terms.page.html',
        styleUrls: ['./terms.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Location])
], TermsPage);
export { TermsPage };
//# sourceMappingURL=terms.page.js.map