import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// TODO:  dayjs is throwing this ERROR:
//        error TS2339: Property 'to' does not exist on type 'Dayjs'.
// Luckily there's a PR that apparently fixes this (https://github.com/iamkun/dayjs/issues/297#issuecomment-442748858)
// When fixed, uncomment this
// import * as dayjs from 'dayjs';
// When fixed, remove this
import * as _dayjs from 'dayjs';
const dayjs = _dayjs;
let CountdownTimerComponent = class CountdownTimerComponent {
    constructor() {
        this._initialUnit = 'hour';
        this._endingUnit = 'second';
        this._updateInterval = interval(1000);
        this._unsubscribeSubject = new Subject();
        // DIVISORS
        // 60 seconds * 60 (minutes) * 24 (hours) = 86400 seconds = 1 day
        this._dayDivisor = (60 * 60 * 24);
        // 60 seconds * 60 (minutes) = 3600 seconds = 1 hour
        this._hourDivisor = (60 * 60);
        // 60 seconds = 1 minute
        this._minuteDivisor = 60;
        this._secondDivisor = 1;
        // MODULUS
        // Neutral modulus
        this._dayModulus = (secondsLeft) => secondsLeft;
        // The modulus operator (%) returns the division remainder.
        // To figure out how many hours are left after taking in consideration the days, we should do:
        //    (secondsLeft % hourModulus) / hourDivisor
        // In 1 day there are 86400 seconds, and in 1 hour 3600 seconds. 1 day + 1 hour = 90000 seconds
        //    (90000s % 86400s) / 3600s = 1h
        this._hourModulus = (secondsLeft) => (secondsLeft % this._dayDivisor);
        this._minuteModulus = (secondsLeft) => (secondsLeft % this._hourDivisor);
        this._secondModulus = (secondsLeft) => (secondsLeft % this._minuteDivisor);
    }
    set end(endingTime) {
        this._endingTime = (endingTime !== undefined && endingTime !== null) ? dayjs(endingTime) : dayjs();
    }
    set units(units) {
        // 'day', 'hour, 'minute', 'second'
        this._initialUnit = (units !== undefined && (units.from !== undefined && units.from !== null)) ? units.from : 'hour';
        this._endingUnit = (units !== undefined && (units.to !== undefined && units.to !== null)) ? units.to : 'second';
        // For 'day' unit, use the default modulus
        // Adjust modulus depending on the unit
        if (this._initialUnit === 'hour') {
            // Cancelation modulus
            this._dayModulus = (secondsLeft) => 1;
            // Neutral modulus
            this._hourModulus = (secondsLeft) => secondsLeft;
        }
        if (this._initialUnit === 'minute') {
            // Cancelation modulus
            this._dayModulus = (secondsLeft) => 1;
            this._hourModulus = (secondsLeft) => 1;
            // Neutral modulus
            this._minuteModulus = (secondsLeft) => secondsLeft;
        }
        if (this._initialUnit === 'second') {
            // Cancelation modulus
            this._dayModulus = (secondsLeft) => 1;
            this._hourModulus = (secondsLeft) => 1;
            this._minuteModulus = (secondsLeft) => 1;
            // Neutral modulus
            this._secondModulus = (secondsLeft) => secondsLeft;
        }
    }
    ngOnInit() {
        this._updateInterval.pipe(takeUntil(this._unsubscribeSubject)).subscribe((val) => {
            const secondsLeft = this._endingTime.diff(dayjs(), 'second');
            this._daysLeft = Math.floor(this._dayModulus(secondsLeft) / this._dayDivisor);
            this._hoursLeft = Math.floor(this._hourModulus(secondsLeft) / this._hourDivisor);
            this._minutesLeft = Math.floor(this._minuteModulus(secondsLeft) / this._minuteDivisor);
            this._secondsLeft = Math.floor(this._secondModulus(secondsLeft) / this._secondDivisor);
        }, (error) => console.error(error)
        // () => console.log('[takeUntil] complete')
        );
    }
    ngOnDestroy() {
        this._unsubscribeSubject.next();
        this._unsubscribeSubject.complete();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], CountdownTimerComponent.prototype, "end", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], CountdownTimerComponent.prototype, "units", null);
CountdownTimerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-countdown-timer',
        templateUrl: './countdown-timer.component.html',
        styleUrls: [
            './countdown-timer.component.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], CountdownTimerComponent);
export { CountdownTimerComponent };
//# sourceMappingURL=countdown-timer.component.js.map