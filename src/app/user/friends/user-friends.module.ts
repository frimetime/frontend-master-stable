import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserFriendsPage } from './user-friends.page';
import { UserService } from '../user.service';
import { UserFriendsResolver } from './user-friends.resolver';
import { ComponentsModule } from '../../components/components.module';
import { FriendAddPage } from '../../popover/friend-add/friend-add.page';
import { FrimeRequestSentPage } from '../../popover/frime-request-sent/frime-request-sent.page';
import { AlreadyRequestSentComponent } from '../../popover/already-request-sent/already-request-sent.component';
import { FriendDeletePage } from '../../popover/friend-delete/friend-delete.page';

const routes: Routes = [
  {
    path: '',
    component: UserFriendsPage,
    resolve: {
      data: UserFriendsResolver
    },
    data: { reuse: false }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ],
  declarations: [UserFriendsPage],
  providers: [
    UserFriendsResolver,
    UserService
  ],
  entryComponents: [FriendAddPage, FrimeRequestSentPage, AlreadyRequestSentComponent, FriendDeletePage]
})
export class UserFriendsPageModule { }
