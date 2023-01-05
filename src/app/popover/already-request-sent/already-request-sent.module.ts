import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlreadyRequestSentComponent } from './already-request-sent.component';
import { AlreadyRequestSentPageRoutingModule } from './already-request-sent-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlreadyRequestSentPageRoutingModule
  ],
  declarations: [AlreadyRequestSentComponent]
})
export class AlreadyRequestSentPageModule { }
