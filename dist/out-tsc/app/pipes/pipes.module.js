import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgMathPipesModule } from 'angular-pipes';
import { FloorPipe } from 'angular-pipes';
import { TimeDifferencePipe } from './time-difference.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
let PipesModule = class PipesModule {
};
PipesModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            IonicModule.forRoot(),
            NgMathPipesModule
        ],
        declarations: [
            TimeDifferencePipe,
            TimeAgoPipe
        ],
        exports: [
            FloorPipe,
            TimeDifferencePipe,
            TimeAgoPipe
        ],
        entryComponents: [],
    })
], PipesModule);
export { PipesModule };
//# sourceMappingURL=pipes.module.js.map