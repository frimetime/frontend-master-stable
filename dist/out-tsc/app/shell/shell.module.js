import * as tslib_1 from "tslib";
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';
import { ImageShellComponent } from './image-shell/image-shell.component';
import { TextShellComponent } from './text-shell/text-shell.component';
import { AppShellConfig } from './config/app-shell.config';
let ShellModule = class ShellModule {
};
ShellModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AspectRatioComponent,
            ImageShellComponent,
            TextShellComponent
        ],
        providers: [
            // Inspired in: https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/
            {
                provide: APP_INITIALIZER,
                useFactory: (appShellConfig) => {
                    return () => appShellConfig.load();
                },
                deps: [AppShellConfig],
                multi: true
            }
        ],
        imports: [
            CommonModule,
            HttpClientModule,
            IonicModule.forRoot()
        ],
        exports: [
            AspectRatioComponent,
            ImageShellComponent,
            TextShellComponent
        ]
    })
], ShellModule);
export { ShellModule };
//# sourceMappingURL=shell.module.js.map