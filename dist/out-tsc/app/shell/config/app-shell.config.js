// Inspired in: https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/
var AppShellConfig_1;
import * as tslib_1 from "tslib";
import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
let AppShellConfig = AppShellConfig_1 = class AppShellConfig {
    constructor(http) {
        this.http = http;
    }
    // Simplified version from: https://stackoverflow.com/a/49707898/1116959
    load() {
        const configFile = './assets/config/app-shell.config' + ((!isDevMode()) ? '.prod' : '') + '.json';
        return this.http.get(configFile).pipe(tap(configSettings => {
            AppShellConfig_1.settings = configSettings;
        }))
            .toPromise()
            .catch((error) => {
            console.log(`Could not load file '${configFile}'`, error);
        });
    }
};
AppShellConfig = AppShellConfig_1 = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], AppShellConfig);
export { AppShellConfig };
//# sourceMappingURL=app-shell.config.js.map