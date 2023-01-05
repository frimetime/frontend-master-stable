var CounterInputComponent_1;
import * as tslib_1 from "tslib";
import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
export function counterRangeValidator(minValue, maxValue) {
    return (c) => {
        const err = {
            rangeError: {
                given: c.value,
                min: minValue || 0,
                max: maxValue || 10
            }
        };
        return (c.value > +maxValue || c.value < +minValue) ? err : null;
    };
}
let CounterInputComponent = CounterInputComponent_1 = class CounterInputComponent {
    constructor() {
        // tslint:disable-next-line:no-input-rename
        this._counterValue = 0;
        this.propagateChange = () => { }; // Noop function
        this.validateFn = () => { }; // Noop function
    }
    get counterValue() {
        return this._counterValue;
    }
    set counterValue(val) {
        this._counterValue = val;
        this.propagateChange(val);
    }
    ngOnChanges(inputs) {
        if (inputs.counterRangeMax || inputs.counterRangeMin) {
            this.validateFn = counterRangeValidator(this.counterRangeMin, this.counterRangeMax);
        }
    }
    writeValue(value) {
        if (value) {
            this.counterValue = value;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    increase() {
        this.counterValue++;
    }
    decrease() {
        this.counterValue--;
    }
    validate(c) {
        return this.validateFn(c);
    }
};
tslib_1.__decorate([
    Input('counterValue'),
    tslib_1.__metadata("design:type", Object)
], CounterInputComponent.prototype, "_counterValue", void 0);
tslib_1.__decorate([
    Input('max'),
    tslib_1.__metadata("design:type", Object)
], CounterInputComponent.prototype, "counterRangeMax", void 0);
tslib_1.__decorate([
    Input('min'),
    tslib_1.__metadata("design:type", Object)
], CounterInputComponent.prototype, "counterRangeMin", void 0);
CounterInputComponent = CounterInputComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'app-counter-input',
        templateUrl: './counter-input.component.html',
        styleUrls: ['./counter-input.component.scss'],
        providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CounterInputComponent_1), multi: true },
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => CounterInputComponent_1), multi: true }
        ],
        encapsulation: ViewEncapsulation.None
    })
], CounterInputComponent);
export { CounterInputComponent };
//# sourceMappingURL=counter-input.component.js.map