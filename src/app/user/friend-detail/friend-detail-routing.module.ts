import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendDetailPage } from './friend-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FriendDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendDetailPageRoutingModule {}
