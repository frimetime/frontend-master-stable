import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
// import { FirebaseService } from './firebase.service';
// import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from './env.service';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
let AuthService = class AuthService {
    constructor(
    // private firebaseService: FirebaseService,
    // public afAuth: AngularFireAuth
    http, env, storage, plt) {
        this.http = http;
        this.env = env;
        this.storage = storage;
        this.plt = plt;
        this.isLoggedIn = new BehaviorSubject(false);
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }
    checkToken() {
        this.storage.get('token').then(res => {
            if (res) {
                this.token = res;
                this.isLoggedIn.next(true);
            }
        });
    }
    doRegister(value) {
        return this.http.post(this.env.API_URL, {
            username: value.name,
            firstname: value.firstname,
            lastname: value.lastname,
            country: value.country,
            city: value.city,
            role: value.role,
            birthday: value.birthdate,
            email: value.email,
            password: value.password
        });
    }
    // doRegister(value){
    //  return new Promise<any>((resolve, reject) => {
    //    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
    //    .then(
    //      res => {resolve(res);
    //       console.log(res.user.uid, 'which parameters are passed?')
    //       this.userID = res.user.uid;
    //      },
    //      err => reject(err))
    //  })
    // }
    // doLogin(value) {
    //  return new Promise<any>((resolve, reject) => {
    //    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    //    .then(
    //      res => {resolve(res);
    //       console.log(res.user.uid, 'which parameters are passed?');
    //       this.userID = res.user.uid;
    //      },
    //      err => reject(err));
    //  });
    // }
    doLogin(value) {
        return this.http.post(this.env.LOGIN_URL, {
            user: value.email,
            password: value.password
        }).pipe(tap(res => {
            if (res['code'] === 200) {
                this.storage.set('token', res['token'])
                    .then(() => {
                    this.checkToken();
                   // console.log('Token Stored!');
                }, error => console.error('Error in storing item', error));
                this.token = res['token'];
                this.isLoggedIn.next(true);
            }
            return res;
        }));
    }
    doLogout() {
        return this.storage.remove('token').then(() => {
            this.isLoggedIn.next(false);
        });
    }
    isAuthenticated() {
        return this.isLoggedIn.value;
    }
    doRecoverPassword(value) {
        return this.http.post(this.env.RECOVER_PASS_URL, { user: value.email });
    }
    doVerifyEmail(user) {
        return this.http.post(this.env.VERIFYEMAIL_URL, {
            user: user
        });
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient,
        RegisterService,
        Storage,
        Platform])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map