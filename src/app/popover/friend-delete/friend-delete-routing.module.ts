import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendDeletePage } from './friend-delete.page';

const routes: Routes = [
  {
    path: '',
    component: FriendDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendDeletePageRoutingModule {}
