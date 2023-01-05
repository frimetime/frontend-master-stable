import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotipopupPageRoutingModule } from './notipopup-routing.module';

import { NotipopupPage } from './notipopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotipopupPageRoutingModule
  ],
  declarations: [NotipopupPage]
})
export class NotipopupPageModule {}
