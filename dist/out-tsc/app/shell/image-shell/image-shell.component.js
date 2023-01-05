import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { AppShellConfig } from '../config/app-shell.config';
let ImageShellComponent = class ImageShellComponent {
    constructor(platformId) {
        this.platformId = platformId;
        // To debug shell styles, change configuration in the assets/app-shell.config.json file
        this.debugMode = (AppShellConfig.settings && AppShellConfig.settings.debug) ? AppShellConfig.settings.debug : false;
        // tslint:disable-next-line:variable-name
        this._src = '';
        // tslint:disable-next-line:variable-name
        this._alt = '';
        // tslint:disable-next-line:variable-name
        this._mode = '';
        this.imageLoaded = false;
    }
    set mode(val) {
        this._mode = (val !== undefined && val !== null) ? val : '';
    }
    get mode() {
        return this._mode;
    }
    set src(val) {
        if (!this.debugMode) {
            this._src = (val !== undefined && val !== null) ? val : '';
        }
        if (this._mode === 'cover') {
            // Unset the background-image
            this.backgroundImage = 'unset';
        }
        // Show loading indicator
        // When using SSR (Server Side Rendering), avoid the loading animation while the image resource is being loaded
        if (isPlatformServer(this.platformId)) {
            this.imageLoaded = true;
        }
        else {
            this.imageLoaded = false;
        }
    }
    set alt(val) {
        this._alt = (val !== undefined && val !== null) ? val : '';
    }
    _imageLoaded() {
        this.imageLoaded = true;
        // If it's a cover image then set the background-image property accordingly
        if (this._mode === 'cover') {
            this.backgroundImage = 'url(' + this._src + ')';
        }
    }
};
tslib_1.__decorate([
    HostBinding('class.img-loaded'),
    tslib_1.__metadata("design:type", Object)
], ImageShellComponent.prototype, "imageLoaded", void 0);
tslib_1.__decorate([
    HostBinding('style.backgroundImage'),
    tslib_1.__metadata("design:type", String)
], ImageShellComponent.prototype, "backgroundImage", void 0);
tslib_1.__decorate([
    HostBinding('attr.mode'),
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ImageShellComponent.prototype, "mode", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ImageShellComponent.prototype, "src", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ImageShellComponent.prototype, "alt", null);
ImageShellComponent = tslib_1.__decorate([
    Component({
        selector: 'app-image-shell',
        templateUrl: './image-shell.component.html',
        styleUrls: ['./image-shell.component.scss']
    }),
    tslib_1.__param(0, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [String])
], ImageShellComponent);
export { ImageShellComponent };
//# sourceMappingURL=image-shell.component.js.map