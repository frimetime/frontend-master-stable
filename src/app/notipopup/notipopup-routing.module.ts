import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotipopupPage } from './notipopup.page';

const routes: Routes = [
  {
    path: '',
    component: NotipopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotipopupPageRoutingModule {}
