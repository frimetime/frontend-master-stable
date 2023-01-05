import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrimeRequestSentPageRoutingModule } from './frime-request-sent-routing.module';

import { FrimeRequestSentPage } from './frime-request-sent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrimeRequestSentPageRoutingModule
  ],
  declarations: [FrimeRequestSentPage],
  entryComponents: [FrimeRequestSentPage]
})
export class FrimeRequestSentPageModule { }
