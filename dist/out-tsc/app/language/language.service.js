import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let LanguageService = class LanguageService {
    constructor() {
        this.languages = new Array();
        this.languages.push({ name: 'English', code: 'en' }, { name: 'Spanish', code: 'es' }, { name: 'French', code: 'fr' });
    }
    getLanguages() {
        return this.languages;
    }
};
LanguageService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], LanguageService);
export { LanguageService };
//# sourceMappingURL=language.service.js.map