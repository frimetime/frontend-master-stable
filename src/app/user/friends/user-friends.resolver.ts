import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../user.service';
import { UserFriendsModel } from './user-friends.model';
import { Observable } from 'rxjs';
import { DataStore } from '../../shell/data-store';
import {UserListModel} from './user-list.model';

@Injectable()
export class UserFriendsResolver implements Resolve<any> {

  constructor(private userService: UserService) { }

  resolve() {
    // const dataSource: Observable<UserFriendsModel> = this.userService.getFriendsDataSource();
    // const dataStore: DataStore<UserFriendsModel> = this.userService.getFriendsStore(dataSource);

    // const dataSource: Observable<any> = this.userService.getUserDataSource();
    // const dataStore: DataStore<UserListModel> = this.userService.getUserDataStore();
    // console.log('resolve: ', dataSource);
    //
    // return dataStore;
    return this.userService.doGetUserList();
  }
}
