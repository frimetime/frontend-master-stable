import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrimeFullPage } from './frime-full.page';

const routes: Routes = [
  {
    path: '',
    component: FrimeFullPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrimeFullPageRoutingModule {}
