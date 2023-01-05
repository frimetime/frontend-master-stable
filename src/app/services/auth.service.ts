import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
// import { FirebaseService } from './firebase.service';
// import { AngularFireAuth } from '@angular/fire/auth';

import { BehaviorSubject, Subscription, interval, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from './env.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { tap, map, ignoreElements } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { SocialUser, AuthService as SocialAuthService } from 'ng4-social-login';
import { debug } from 'console';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {

  public isLoggedIn = new BehaviorSubject(false);
  public refreshedtoken: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public token: any;
  public urlSearchParams = new URLSearchParams();
  private REFRESH_TOKEN_URL = 'https://frimetime.com/api/refresh';
  private REGITER_DEVICE_KEY ='https://frimetime.com//api/push/register';
  // private subscription: Subscription;
  public socialUser: SocialUser;
  public _globalserviceVariable ='';

  //  private tokenExpiry: number = (5 * 60 * 1000);
  // private remainingTime: number;
  // private counter$: Observable<number>;
  GET_PROFILE_URL = 'https://frimetime.com/api/profile';

  constructor(
    // private firebaseService: FirebaseService,
    // public afAuth: AngularFireAuth
    private http: HttpClient,
    private env: RegisterService,
    public storage: Storage,
    private plt: Platform,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  ngOnInit() { }

  ngOnDestroy() { }

  refreshToken() {
    //TODO load hosting or participating frimes of user 
    console.log('Refresh token Api called!');
    // debugger;
    if ((this.urlSearchParams.toString() == null || this.urlSearchParams.toString().length <= 0)) {
      if (this.token != null && this.token.length > 0) {
        if (this.urlSearchParams.has('token')) { this.urlSearchParams.delete('token'); }
        this.urlSearchParams.append('token', this.token);
      }
    }
    // debugger;
    return this.http.post(this.REFRESH_TOKEN_URL + '?' + this.urlSearchParams.toString(), {});
    // .pipe(
    //   tap(res => {
    //     if (res['code'] === 200) {
    //       // this.storage.remove('token');
    //       // this.storage.clear();
    //       this.token = res['token'];
    //       this.userLoggedInSuccessfully();
    //     }
    //     return res;
    //   }, err => {
    //     console.log(err);
    //   })
    // );
  }

  checkToken() {
    this.storage.get('token').then(res => {
      if (res) {
        this.token = res;
        // this.isLoggedIn.next(true);
      }
    });
  }


  doRegister(value) {
    return this.http.post(this.env.API_URL,
      {
        username: value.name,
        // firstname: value.firstname,
        // lastname: value.lastname,
        country: value.country,
        city: value.city,
        role: value.role,
        birthday: value.birthdate,
        email: value.email,
        password: value.password
      }
    );
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
    return this.http.post(this.env.LOGIN_URL,
      {
        user: value.email,
        password: value.password
      }
    ).pipe(
      tap(res => {
        if (res['code'] === 200) {

          this.token = res['token'];
          this.isLoggedIn.next(true);
          if (this.urlSearchParams.has('token')) { this.urlSearchParams.delete('token'); }
          this.urlSearchParams.append('token', this.token);
        }
        return res;
      })
    );
  }


  doDeviceRegister(value) {

    return this.http.post(this.env.REGISTER_DEVICE_KEY + '?' + this.urlSearchParams.toString(),
      {
        deviceKey: value,
      }
    );
  }

  userLoggedInSuccessfully() {
    this.storage.clear();
    this.storage.set('token', this.token)
      .then(
        () => {
          //this.checkToken();
          //console.log('Token Stored!');
        },
        error => console.error('Error in storing item', error)
      );

    if (this.urlSearchParams.has('token')) { this.urlSearchParams.delete('token'); }
    this.urlSearchParams.append('token', this.token);
    // debugger;
    this.refreshedtoken.next(this.token);
    // this.isLoggedIn.next(true);

  }

  doLogout() {
    this.storage.remove('token');
    this.isLoggedIn.next(false);
    this.storage.clear();
  }

  isAuthenticated() {
    return this.isLoggedIn.value;
  }
  doRecoverPassword(value) {
    return this.http.post(this.env.RECOVER_PASS_URL,
      { user: value.email }
    );
  }
  doVerifyEmail(user: any) {
    return this.http.post(this.env.VERIFYEMAIL_URL, {
      user: user
      //user: value.email
    });
  }

  doGetProfile() {
    return this.http.post(this.GET_PROFILE_URL + '?' + this.urlSearchParams.toString(), null);
  }

  doRegisterSocialUser(socialUser: any) {
    return this.http.post(this.env.REGISTER_SOCIAL_USER_URL, {
      provider: socialUser.provider, // "facebook" or "google",
      email: socialUser.email,
      user_id: socialUser.user_id,
      first_name: socialUser.first_name,
      last_name: socialUser.last_name,
      photo_url: socialUser.photo_url, // "https://.....",
      role: socialUser.role, //  "male" or "female" or "company",
      social_token: socialUser.social_token, // "**********"
      username: socialUser.username
      //user: value.email
    });
  }

  doLoginSocialUser(loginUser: any) {
    return this.http.post(this.env.LOGIN_SOCIAL_USER_URL, {
      provider: loginUser.provider, // "facebook" or "google",
      user_id: loginUser.user_id, // "239485902939495",
      social_token: loginUser.social_token, //  "**********"
    }).pipe(
      tap(res => {
        if (res['code'] === 200) {
          this.storage.set('token', res['token'])
            .then(
              () => {
                this.checkToken();
                //console.log('Token Stored!');
              },
              error => console.error('Error in storing item', error)
            );
          this.token = res['token'];
          // this.tokenExpiry = Number(res['expire']) * 1000;
          // For calling refresh toke api two minutes are subtracting from total expiry time coming from api.  
          // this.tokenExpiry = this.tokenExpiry - (120 * 1000);
          // this.tokenExpiry = (20 * 60 * 1000) - (180 * 1000);
          if (this.urlSearchParams.has('token')) { this.urlSearchParams.delete('token'); }
          this.urlSearchParams.append('token', this.token);
          this.isLoggedIn.next(true);
        }
        return res;
      })
    );;
  }
  // doLogout(){
  //   return new Promise((resolve, reject) => {
  //     if(firebase.auth().currentUser){
  //       firebase.auth().signOut()
  //       .then(() => {
  //         console.log("LOG Out");
  //         resolve();
  //       }).catch((error) => {
  //         reject();
  //       });
  //     }
  //   })
  // }

  // userDetails(){
  //   return firebase.auth().currentUser;
  // }
}
