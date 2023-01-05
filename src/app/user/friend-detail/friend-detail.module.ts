import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendDetailPageRoutingModule } from './friend-detail-routing.module';

import { FriendDetailPage } from './friend-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendDetailPageRoutingModule
  ],
  declarations: [FriendDetailPage]
})
export class FriendDetailPageModule {}
