import * as tslib_1 from "tslib";
import { Component, ContentChild, HostBinding } from '@angular/core';
// Reference to the @ionic/angular Components List:
// https://github.com/ionic-team/ionic/blob/master/angular/src/directives/proxies.ts
import { IonCheckbox } from '@ionic/angular';
let CheckboxWrapperComponent = class CheckboxWrapperComponent {
    constructor() { }
    ngAfterContentInit() {
        // ContentChild is set
        this.isChecked = this.checkbox.checked;
        // Subscribe to changes
        this.checkbox.ionChange.subscribe(changes => {
            this.isChecked = changes.detail.checked;
        });
    }
};
tslib_1.__decorate([
    ContentChild(IonCheckbox, { static: true }),
    tslib_1.__metadata("design:type", IonCheckbox)
], CheckboxWrapperComponent.prototype, "checkbox", void 0);
tslib_1.__decorate([
    HostBinding('class.checkbox-checked'),
    tslib_1.__metadata("design:type", Boolean)
], CheckboxWrapperComponent.prototype, "isChecked", void 0);
CheckboxWrapperComponent = tslib_1.__decorate([
    Component({
        selector: 'app-checkbox-wrapper',
        templateUrl: './checkbox-wrapper.component.html',
        styleUrls: [
            './checkbox-wrapper.component.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], CheckboxWrapperComponent);
export { CheckboxWrapperComponent };
//# sourceMappingURL=checkbox-wrapper.component.js.map