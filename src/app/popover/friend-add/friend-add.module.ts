import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendAddPageRoutingModule } from './friend-add-routing.module';

import { FriendAddPage } from './friend-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendAddPageRoutingModule
  ],
  declarations: [FriendAddPage]
})
export class FriendAddPageModule {}
