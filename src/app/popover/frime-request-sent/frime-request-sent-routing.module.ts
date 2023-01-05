import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrimeRequestSentPage } from './frime-request-sent.page';

const routes: Routes = [
  {
    path: '',
    component: FrimeRequestSentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrimeRequestSentPageRoutingModule {}
