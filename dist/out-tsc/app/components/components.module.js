import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShellModule } from '../shell/shell.module';
import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { GoogleMapComponent } from './google-map/google-map.component';
let ComponentsModule = class ComponentsModule {
};
ComponentsModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ShellModule,
            IonicModule.forRoot()
        ],
        declarations: [
            CheckboxWrapperComponent,
            ShowHidePasswordComponent,
            CountdownTimerComponent,
            CounterInputComponent,
            RatingInputComponent,
            GoogleMapComponent
        ],
        exports: [
            ShellModule,
            CheckboxWrapperComponent,
            ShowHidePasswordComponent,
            CountdownTimerComponent,
            CounterInputComponent,
            RatingInputComponent,
            GoogleMapComponent
        ]
    })
], ComponentsModule);
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map