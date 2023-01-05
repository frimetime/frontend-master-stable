import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';

import { ChatPage } from './chat.page';
import { AutosizeModule } from 'ngx-autosize';
import { UserService } from '../user/user.service';
import { FrimeCancelPage } from '../popover/frime-cancel/frime-cancel.page';
import { FrimeLeavePage } from '../popover/frime-leave/frime-leave.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage,
    // runGuardsAndResolvers: 'always',
    // data: { reuse: false }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AutosizeModule,
    ComponentsModule
  ],
  declarations: [ChatPage],
  providers: [
    UserService
  ],
  entryComponents: [FrimeCancelPage, FrimeLeavePage]
})
export class ChatPageModule { }


