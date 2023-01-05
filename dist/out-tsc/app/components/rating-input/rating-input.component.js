var RatingInputComponent_1;
import * as tslib_1 from "tslib";
import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let RatingInputComponent = RatingInputComponent_1 = class RatingInputComponent {
    constructor() {
        this.max = 5;
        this.readOnly = false;
        this.propagateChange = () => { }; // Noop function
    }
    ngOnInit() {
        const states = [];
        for (let i = 0; i < this.max; i++) {
            if (this.innerValue > i && this.innerValue < i + 1) {
                states[i] = 2;
            }
            else if (this.innerValue > i) {
                states[i] = 1;
            }
            else {
                states[i] = 0;
            }
        }
        this.range = states;
    }
    get value() {
        return this.innerValue;
    }
    set value(val) {
        if (val !== this.innerValue) {
            this.innerValue = val;
            this.propagateChange(val);
        }
    }
    writeValue(value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    rate(amount) {
        if (!this.readOnly && amount >= 0 && amount <= this.range.length) {
            this.value = amount;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], RatingInputComponent.prototype, "max", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], RatingInputComponent.prototype, "readOnly", void 0);
RatingInputComponent = RatingInputComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'app-rating-input',
        templateUrl: './rating-input.component.html',
        styleUrls: ['./rating-input.component.scss'],
        providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RatingInputComponent_1), multi: true }
        ],
        encapsulation: ViewEncapsulation.None
    })
], RatingInputComponent);
export { RatingInputComponent };
//# sourceMappingURL=rating-input.component.js.map