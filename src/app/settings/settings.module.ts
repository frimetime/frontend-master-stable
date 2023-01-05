import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import {UserService} from '../user/user.service';
import { DeleteAccountPage } from '../popover/delete-account/delete-account.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    // data: { reuse: false }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [SettingsPage],
  providers: [UserService],
  entryComponents: [DeleteAccountPage]
})
export class SettingsPageModule {}
