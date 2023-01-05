import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { ChatPage } from './chat.page';
import { AutosizeModule } from 'ngx-autosize';
const routes = [
    {
        path: '',
        component: ChatPage
    }
];
let ChatPageModule = class ChatPageModule {
};
ChatPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            AutosizeModule,
            ComponentsModule
        ],
        declarations: [ChatPage]
    })
], ChatPageModule);
export { ChatPageModule };
//# sourceMappingURL=chat.module.js.map