import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrimeCancelPage } from './frime-cancel.page';

const routes: Routes = [
  {
    path: '',
    component: FrimeCancelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrimeCancelPageRoutingModule {}
