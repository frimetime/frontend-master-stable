import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrimeRequestPage } from './frime-request.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: FrimeRequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrimeRequestPageRoutingModule {}
