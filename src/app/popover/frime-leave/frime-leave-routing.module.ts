import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrimeLeavePage } from './frime-leave.page';

const routes: Routes = [
  {
    path: '',
    component: FrimeLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrimeLeavePageRoutingModule {}
