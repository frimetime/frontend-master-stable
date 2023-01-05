import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendAddPage } from './friend-add.page';

const routes: Routes = [
  {
    path: '',
    component: FriendAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendAddPageRoutingModule {}
