import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserProfileModel } from './profile/user-profile.model';
import { UserFriendsModel } from './friends/user-friends.model';
import { DataStore } from '../shell/data-store';
import { AuthService } from '../services/auth.service';
import { LoadingController, Platform } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { UserListModel } from './friends/user-list.model';
let UserService = class UserService {
    constructor(http, authService, plt, loadingController) {
        this.http = http;
        this.authService = authService;
        this.plt = plt;
        this.loadingController = loadingController;
        this.userDataSource = { 'users': [] };
        this.params = new HttpParams();
        this.urlSearchParams = new URLSearchParams();
        this.profile = {
            id: 0,
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            country: '',
            role: '',
            sex: '',
            birthdate: '',
            image: '',
            description: 'You can edit your status here.'
        };
        this.users = [];
        this.GET_PROFILE_URL = 'https://frimetime.eu/api/profile';
        this.UPDATE_PROFILE_URL = 'https://frimetime.eu/api/update_profile';
        this.GET_USER_LIST = 'https://frimetime.eu/api/users';
        this.token = authService.token;
        this.urlSearchParams.append('token', authService.token);
        this.plt.ready().then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const loading = yield this.loadingController.create({
            //     message: 'Loading...'
            // });
            //yield loading.present();
            this.doGetUserList().subscribe(res => {
                if (res['code'] === 200) {
                    this.users = res['data'];
                }
            }, err => { });
            this.doGetProfile().subscribe(res => {
               // loading.dismiss();
                if (res['code'] === 200) {
                    const userData = res['data'];
                    this.profile.username = userData['username'];
                    this.profile.firstname = userData['firstname'];
                    this.profile.lastname = userData['lastname'];
                    this.profile.email = userData['email'];
                    this.profile.country = userData['country'];
                    this.profile.role = userData['role'];
                    this.profile.sex = userData['role'];
                    this.profile.birthdate = userData['birthday'];
                    if (userData['description']) {
                        this.profile.description = userData['description'];
                    }
                    this.profile.image = userData['image'];
                }
                else {
                    authService.doLogout();
                }
            }, err => {
                loading.dismiss();
                console.log(err);
                authService.doLogout();
            });
        }));
    }
    getProfileDataSource() {
        return this.http.get('./assets/sample-data/user/user-profile.json');
    }
    getProfileStore(dataSource) {
        // Use cache if available
        if (!this.profileDataStore) {
            // Initialize the model specifying that it is a shell model
            const shellModel = new UserProfileModel();
            this.profileDataStore = new DataStore(shellModel);
            // Trigger the loading mechanism (with shell) in the dataStore
            this.profileDataStore.load(dataSource);
        }
        return this.profileDataStore;
    }
    getFriendsDataSource() {
        return this.http.get('./assets/sample-data/user/user-friends.json');
    }
    getFriendsStore(dataSource) {
        // Use cache if available
        if (!this.friendsDataStore) {
            // Initialize the model specifying that it is a shell model
            const shellModel = new UserFriendsModel();
            this.friendsDataStore = new DataStore(shellModel);
            // Trigger the loading mechanism (with shell) in the dataStore
            this.friendsDataStore.load(dataSource);
        }
        return this.friendsDataStore;
    }
    getUserDataSource() {
        return this.http.post(this.GET_USER_LIST + '?' + this.urlSearchParams.toString(), null).pipe(tap(res => {
            if (res['code'] === 200) {
                this.userDataSource.users = res['data'];
                console.log('ddd', this.userDataSource);
            }
        }));
    }
    getUserDataStore() {
        // Use cache if available
        if (!this.userListDataStore) {
            // Initialize the model specifying that it is a shell model
            const shellModel = new UserListModel();
            this.userListDataStore = new DataStore(shellModel);
            // Trigger the loading mechanism (with shell) in the dataStore
            this.userListDataStore.load(this.userDataSource);
            console.log(this.userDataSource);
        }
        return this.userListDataStore;
    }
    // tslint:disable-next-line:no-shadowed-variable
    setUser(user) {
        this.user = user;
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
            firstname: value.firstname,
            lastname: value.lastname,
            sex: value.sex,
            country: value.country,
            birthday: value.birthday
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
        const formData = new FormData();
        formData.append('image', fileToUpload, fileToUpload.name);
        return this.http.post(this.UPDATE_PROFILE_URL + '?' + this.urlSearchParams.toString(), formData);
    }
    doGetUserList() {
        return this.http.post(this.GET_USER_LIST + '?' + this.urlSearchParams.toString(), null);
    }
};
UserService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient,
        AuthService,
        Platform,
        LoadingController])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map