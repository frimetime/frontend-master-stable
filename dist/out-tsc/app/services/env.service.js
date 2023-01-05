import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let RegisterService = class RegisterService {
    constructor() {
        //this.API_URL = 'https://frimetime.com/api/register';
        this.API_URL = 'https://frimetime.com/api/register';
        this.LOGIN_URL = 'https://frimetime.com/api/login';
        this.RECOVER_PASS_URL = 'https://frimetime.com/api/forget/password/send';
        this.VERIFYEMAIL_URL = 'https://frimetime.com/api/verify/send';
    }
};
RegisterService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [])
], RegisterService);
export { RegisterService };
//# sourceMappingURL=env.service.js.map