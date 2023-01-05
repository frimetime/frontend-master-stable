import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
let AspectRatioComponent = class AspectRatioComponent {
    constructor() {
        this.ratioPadding = '0px';
    }
    set ratio(ratio) {
        ratio = (ratio !== undefined && ratio !== null) ? ratio : { w: 1, h: 1 };
        const heightRatio = (ratio.h / ratio.w * 100) + '%';
        // Conserve aspect ratio (see: http://stackoverflow.com/a/10441480/1116959)
        this.ratioPadding = '0px 0px ' + heightRatio + ' 0px';
    }
};
tslib_1.__decorate([
    HostBinding('style.padding'),
    tslib_1.__metadata("design:type", Object)
], AspectRatioComponent.prototype, "ratioPadding", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], AspectRatioComponent.prototype, "ratio", null);
AspectRatioComponent = tslib_1.__decorate([
    Component({
        selector: 'app-aspect-ratio',
        templateUrl: './aspect-ratio.component.html',
        styleUrls: ['./aspect-ratio.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AspectRatioComponent);
export { AspectRatioComponent };
//# sourceMappingURL=aspect-ratio.component.js.map