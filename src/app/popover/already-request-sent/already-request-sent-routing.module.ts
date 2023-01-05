import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlreadyRequestSentComponent } from './already-request-sent.component';

const routes: Routes = [
  {
    path: '',
    component: AlreadyRequestSentComponent
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
export class AlreadyRequestSentPageRoutingModule { }
