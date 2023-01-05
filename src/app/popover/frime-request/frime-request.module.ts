import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrimeRequestPageRoutingModule } from './frime-request-routing.module';

import { FrimeRequestPage } from './frime-request.page';
import { FrimeRequestSentPage } from '../frime-request-sent/frime-request-sent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrimeRequestPageRoutingModule
  ],
  declarations: [FrimeRequestPage],
  entryComponents: [FrimeRequestPage,FrimeRequestSentPage]
})
export class FrimeRequestPageModule { }
