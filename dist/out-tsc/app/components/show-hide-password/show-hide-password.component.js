import * as tslib_1 from "tslib";
import { Component, ContentChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
let ShowHidePasswordComponent = class ShowHidePasswordComponent {
    constructor() {
        this.show = false;
    }
    toggleShow() {
        this.show = !this.show;
        if (this.show) {
            this.input.type = 'text';
        }
        else {
            this.input.type = 'password';
        }
    }
};
tslib_1.__decorate([
    ContentChild(IonInput, { static: true }),
    tslib_1.__metadata("design:type", IonInput)
], ShowHidePasswordComponent.prototype, "input", void 0);
ShowHidePasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'app-show-hide-password',
        templateUrl: './show-hide-password.component.html',
        styleUrls: [
            './show-hide-password.component.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ShowHidePasswordComponent);
export { ShowHidePasswordComponent };
//# sourceMappingURL=show-hide-password.component.js.map