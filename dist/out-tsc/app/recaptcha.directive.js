import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
let RecaptchaDirective = class RecaptchaDirective {
    constructor() {
        this.config = {};
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], RecaptchaDirective.prototype, "key", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], RecaptchaDirective.prototype, "config", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], RecaptchaDirective.prototype, "lang", void 0);
RecaptchaDirective = tslib_1.__decorate([
    Directive({
        selector: '[nbRecaptcha]'
    }),
    tslib_1.__metadata("design:paramtypes", [])
], RecaptchaDirective);
export { RecaptchaDirective };
//# sourceMappingURL=recaptcha.directive.js.map