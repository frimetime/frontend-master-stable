import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { AppShellConfig } from '../config/app-shell.config';
let TextShellComponent = class TextShellComponent {
    constructor() {
        // To debug shell styles, change configuration in the assets/app-shell.config.json file
        this.debugMode = (AppShellConfig.settings && AppShellConfig.settings.debug) ? AppShellConfig.settings.debug : false;
        this.textLoaded = false;
    }
    set data(val) {
        if (!this.debugMode) {
            this._data = (val !== undefined && val !== null) ? val : '';
        }
        if (this._data && this._data !== '') {
            this.textLoaded = true;
        }
        else {
            this.textLoaded = false;
        }
    }
};
tslib_1.__decorate([
    HostBinding('class.text-loaded'),
    tslib_1.__metadata("design:type", Object)
], TextShellComponent.prototype, "textLoaded", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], TextShellComponent.prototype, "data", null);
TextShellComponent = tslib_1.__decorate([
    Component({
        selector: 'app-text-shell',
        templateUrl: './text-shell.component.html',
        styleUrls: ['./text-shell.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TextShellComponent);
export { TextShellComponent };
//# sourceMappingURL=text-shell.component.js.map