import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
// When fixed, uncomment this
// import * as dayjs from 'dayjs';
import * as _dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// TODO:  dayjs is throiwing this ERROR:
//        error TS2339: Property 'to' does not exist on type 'Dayjs'.
// Luckily there is a PR which solves it (https://github.com/iamkun/dayjs/issues/297#issuecomment-442748858)
// When fixed, remove this line:
const dayjs = _dayjs;
let TimeAgoPipe = class TimeAgoPipe {
    transform(value) {
        dayjs.extend(relativeTime);
        let timeAgo = '';
        if (value) {
            const withoutSuffix = (dayjs(value).diff(dayjs(), 'day') < 0) ? false : true;
            timeAgo = dayjs().to(dayjs(value), withoutSuffix);
        }
        return timeAgo;
    }
};
TimeAgoPipe = tslib_1.__decorate([
    Pipe({ name: 'appTimeAgo' })
], TimeAgoPipe);
export { TimeAgoPipe };
//# sourceMappingURL=time-ago.pipe.js.map