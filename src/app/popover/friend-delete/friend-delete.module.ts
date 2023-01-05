import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendDeletePageRoutingModule } from './friend-delete-routing.module';

import { FriendDeletePage } from './friend-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendDeletePageRoutingModule
  ],
  declarations: [FriendDeletePage]
})
export class FriendDeletePageModule {}
