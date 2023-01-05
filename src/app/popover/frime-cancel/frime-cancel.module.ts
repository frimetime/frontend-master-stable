import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrimeCancelPageRoutingModule } from './frime-cancel-routing.module';

import { FrimeCancelPage } from './frime-cancel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrimeCancelPageRoutingModule
  ],
  declarations: [FrimeCancelPage]
})
export class FrimeCancelPageModule {}
