import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FrimeFullPageRoutingModule } from './frime-full-routing.module';
import { FrimeFullPage } from './frime-full.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrimeFullPageRoutingModule
  ],
   declarations: [FrimeFullPage]
})
export class FrimeFullPageModule {}
