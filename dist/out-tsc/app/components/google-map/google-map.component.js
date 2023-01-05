import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input } from '@angular/core';
let GoogleMapComponent = class GoogleMapComponent {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.$mapReady = new EventEmitter();
        this._mapIdledOnce = false;
    }
    ngOnInit() {
        this.initMap();
    }
    initMap() {
        this._el = this._elementRef.nativeElement;
        this._map = new google.maps.Map(this._el, this.mapOptions);
        // Workarround for init method: try to catch the first idle event after the map creation
        // (this._mapIdledOnce). The following idle events don't matter.
        const _ready_listener = this._map.addListener('idle', () => {
            console.log('mapReady - IDLE');
            if (!this._mapIdledOnce) {
                this.$mapReady.emit(this._map);
                this._mapIdledOnce = true;
                // Stop listening to event, the map is ready
                google.maps.event.removeListener(_ready_listener);
            }
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GoogleMapComponent.prototype, "mapOptions", void 0);
GoogleMapComponent = tslib_1.__decorate([
    Component({
        selector: 'google-map',
        template: ''
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], GoogleMapComponent);
export { GoogleMapComponent };
//# sourceMappingURL=google-map.component.js.map