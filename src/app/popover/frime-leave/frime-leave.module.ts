import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrimeLeavePageRoutingModule } from './frime-leave-routing.module';

import { FrimeLeavePage } from './frime-leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrimeLeavePageRoutingModule
  ],
  declarations: [FrimeLeavePage]
})
export class FrimeLeavePageModule {}
