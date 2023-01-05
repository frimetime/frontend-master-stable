import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
let SignupCaptchaComponent = class SignupCaptchaComponent {
    constructor() { }
    ngOnInit() {
        this.addRecaptchaScript();
    }
    renderReCaptch() {
        window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
            'sitekey': '6LeNWMQUAAAAABoMJoh6jhP53Zyzykbt8dNUT_qt',
            'callback': (response) => {
                console.log(response);
            }
        });
    }
    addRecaptchaScript() {
        window['grecaptchaCallback'] = () => {
            this.renderReCaptch();
        };
        (function (d, s, id, obj) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                obj.renderReCaptch();
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'recaptcha-jssdk', this));
    }
};
tslib_1.__decorate([
    ViewChild('recaptcha', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], SignupCaptchaComponent.prototype, "recaptchaElement", void 0);
SignupCaptchaComponent = tslib_1.__decorate([
    Component({
        selector: 'app-signup-captcha',
        templateUrl: './signup-captcha.component.html',
        styleUrls: ['./signup-captcha.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], SignupCaptchaComponent);
export { SignupCaptchaComponent };
//# sourceMappingURL=signup-captcha.component.js.map