import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UserProfileModel } from './profile/user-profile.model';
import { UserFriendsModel } from './friends/user-friends.model';
import { DataStore } from '../shell/data-store';
import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from './profile/userProfile';
import { LoadingController, Platform } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { UserListModel } from './friends/user-list.model';


// tslint:disable-next-line:class-name
interface user {
  username: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'  // <- ADD THIS
})
export class UserService {
  private profileDataStore: DataStore<UserProfileModel>;
  private friendsDataStore: DataStore<UserFriendsModel>;
  private userListDataStore: DataStore<UserListModel>;
  private userDataSource: any = { 'users': [] };
  params = new HttpParams();
  urlSearchParams = new URLSearchParams();
  profile: Profile = {
    id: 0,
    username: '',
    email: '',
    country: '',
    role: '',
    sex: '',
    birthdate: '',
    image: '',
    description: 'You can edit your status here.'
  };
  users: Profile[] = [];

  private user: user;
  token: string;
  GET_PROFILE_URL = 'https://frimetime.com/api/profile';
  UPDATE_PROFILE_URL = 'https://frimetime.com/api/update_profile';
  DELETE_USER_ACCOUNT_URL = 'https://frimetime.com/api/delete_account';
  GET_USER_LIST_URL = 'https://frimetime.com/api/users';
  GET_FRIENDS_LIST_URL = 'https://frimetime.com/api/friends';
  SEND_FRIEND_REQUEST_URL = 'https://frimetime.com/api/friend/invite';
  ACCEPT_FRIEND_REQUEST_URL = 'https://frimetime.com/api/friend/invite_accept';
  BLOCK_FRIEND_URL = 'https://frimetime.com/api/friend/block';
  UNBLOCK_FRIEND_URL = 'https://frimetime.com/api/friend/unblock';
  DELETE_FRIEND_URL = 'https://frimetime.com/api/friend/delete';
  DELETE_NOTIFICATION_REQUEST_URL ='https://frimetime.com/api/push/deletenotifications';
  DELETE_ALL_NOTIFICATION_REQUEST_URL ='https://frimetime.com/api/push/deleteallnotifications';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private plt: Platform,
    private loadingController: LoadingController,
  ) {
    this.token = authService.token;
    this.urlSearchParams.append('token', authService.token);
    
    authService.refreshedtoken.subscribe((token)=>{
      this.token = token;
      if (this.urlSearchParams.has('token')) { this.urlSearchParams.delete('token'); }
      this.urlSearchParams.append('token', this.token);
    });
    
    this.plt.ready().then(async () => {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      this.doGetUserList().subscribe(res => {
        if (res['code'] === 200) {
          this.users = res['data'];
        }
      },
        err => { });
      this.doGetProfile().subscribe(res => {
        loading.dismiss();
        if (res['code'] === 200) {
          const userData = res['data'];
          this.profile.id = userData['id'];
          this.profile.username = userData['username'];
          this.profile.email = userData['email'];
          this.profile.country = userData['country'];
          this.profile.role = userData['role'];
          this.profile.sex = userData['role'];
          this.profile.birthdate = userData['birthday'];
          if (userData['description']) {
            this.profile.description = userData['description'];
          }
          this.profile.image = userData['image'];
        } else {
          authService.doLogout();
        }
      }, err => {
        loading.dismiss();
        console.log(err);
        authService.doLogout();
      });
    });
  }

  public getProfileDataSource(): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>('./assets/sample-data/user/user-profile.json');
  }

  public getProfileStore(dataSource: Observable<UserProfileModel>): DataStore<UserProfileModel> {
    // Use cache if available
    if (!this.profileDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: UserProfileModel = new UserProfileModel();
      this.profileDataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.profileDataStore.load(dataSource);
    }
    return this.profileDataStore;
  }

  public getFriendsDataSource() {
    return this.http.get<UserFriendsModel>('./assets/sample-data/user/user-friends.json');
  }

  public getFriendsStore(dataSource: Observable<UserFriendsModel>): DataStore<UserFriendsModel> {
    // Use cache if available
    if (!this.friendsDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: UserFriendsModel = new UserFriendsModel();
      this.friendsDataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.friendsDataStore.load(dataSource);
    }
    return this.friendsDataStore;
  }

  public getUserDataSource() {
    return this.http.post(this.GET_USER_LIST_URL + '?' + this.urlSearchParams.toString(), null).pipe(
      tap(res => {
        if (res['code'] === 200) {
          this.userDataSource.users = res['data'];
          console.log('ddd', this.userDataSource);
        }
      })
    );
  }

  public getUserDataStore(): DataStore<UserListModel> {
    // Use cache if available
    if (!this.userListDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: UserListModel = new UserListModel();
      this.userListDataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.userListDataStore.load(this.userDataSource);
      console.log(this.userDataSource);
    }
    return this.userListDataStore;
  }

  // tslint:disable-next-line:no-shadowed-variable
  setUser(user: user) {
    this.user = user;
  }

  public getuser() {
    return this.user;
  }

  getUID() {
    return this.user.uid;
  }
  doGetProfile() {
    return this.http.post(this.GET_PROFILE_URL + '?' + this.urlSearchParams.toString(), null);
  }
  doUpdate(value) {
    return this.http.post(this.UPDATE_PROFILE_URL + '?' + this.urlSearchParams.toString(), {
      username: value.username,
      sex: value.sex,
      country: value.country,
      birthday: value.birthdate
    });
  }
  doUpdateUserName(value) {
    return this.http.post(this.UPDATE_PROFILE_URL + '?' + this.urlSearchParams.toString(), {
      username: value.username
    });
  }
  doUpdateFirstName(value) {
    return this.http.post(this.UPDATE_PROFILE_URL + '?' + this.urlSearchParams.toString(), {
      firstname: value.firstname
    });
  }
  doUpdateStatus(value) {
    return this.http.post(this.UPDATE_PROFILE_URL + '?' + this.urlSearchParams.toString(), {
      description: value.status
    });
  }
  doUpload(fileToUpload) {
    console.log(fileToUpload);
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(this.UPDATE_PROFILE_URL + '?' + this.urlSearchParams.toString(), formData);
  }
  doGetUserList(country: string = '', city: string = '', keyword: string = '') {
    return this.http.post(this.GET_USER_LIST_URL + '?' + this.urlSearchParams.toString(), {
      country: country,
      city: city,
      keyword: keyword
    });
  }
  doGetFriendList() {
    return this.http.post(this.GET_FRIENDS_LIST_URL + '?' + this.urlSearchParams.toString(), {
      condition: 0
    });
  }
  doAddFriendRequest(userId) {
    return this.http.post(this.SEND_FRIEND_REQUEST_URL + '?' + this.urlSearchParams.toString(), {
      friend_id: userId.toString()
    });
  }
  doAcceptFriendRequest(invite_id) {
    return this.http.post(this.ACCEPT_FRIEND_REQUEST_URL + '?' + this.urlSearchParams.toString(), {
      invite_id: invite_id,
      accept:"yes",
    });
  }
  doDeleteNotification(id)
  {
    return this.http.post(this.DELETE_NOTIFICATION_REQUEST_URL + '?' + this.urlSearchParams.toString(), {
      id: id,
    });
  }
  doDeleteAllNotification()
  {
    return this.http.post(this.DELETE_ALL_NOTIFICATION_REQUEST_URL + '?' + this.urlSearchParams.toString(), {
    });
  }

  doBlockFriend(friend_id: string) {
    return this.http.post(this.BLOCK_FRIEND_URL + '?' + this.urlSearchParams.toString(), {
      block_id: friend_id.toString()
    });
  }

  doUnblockFriend(friend_id: string) {
    return this.http.post(this.UNBLOCK_FRIEND_URL + '?' + this.urlSearchParams.toString(), {
      block_id: friend_id.toString()
    });
  }

  doDeleteFriend(friend_id: string) {
    return this.http.post(this.DELETE_FRIEND_URL + '?' + this.urlSearchParams.toString(), {
      friend_id: friend_id.toString()
    });
  }

}
