import { Component, OnInit, HostListener } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { LoadingController } from "@ionic/angular";
import { VerifyRequestPage } from "../verify-request/verify-request.page";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
// import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { NavController, PopoverController } from "@ionic/angular";
import { ForgotPasswordPage } from "../forgot-password/forgot-password.page";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { environment } from "../../environments/environment";
import { AuthService as SocialAuthService, SocialUser, FacebookLoginProvider, GoogleLoginProvider } from 'ng4-social-login';
import { CommonService } from '../services/common.service';
import { from } from 'core-js/fn/array';
import { Item, ApiService } from '../services/api.service';


declare var gtag;

var btnAdd: 'aths-btn';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./styles/login.page.scss"],
})

export class LoginPage implements OnInit {
  
  validations_form: FormGroup;
  errorMessage = "";
  loading: any;
  value = 0;
  items: Array<Item>;

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long.",
      },
    ],
  };


  private socialUserInfo: SocialUser;
  private soicalUserTempPwd = 'ayesha29';

  deferredPrompt: any;
  showButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public loadingController: LoadingController,
    // private fireAuth: AngularFireAuth,
    private nav: NavController,
    private popoverController: PopoverController,
    public menuCtrl: MenuController,
    private socialAuthService: SocialAuthService,
    private commonService: CommonService,
    private apiService: ApiService,
  ) { }
  

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });
    this.loading = await this.loadingController.create({
      message: "Connecting ...",
    });
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "login page",
      page_path: "/login",
    });
    
    this.fetchData();

    // window.addEventListener('DOMContentLoaded', () => {
    //   let displayMode = 'browser tab';
    //   if (navigator.standalone) {
    //     displayMode = 'standalone-ios';
    //   }
    //   if (window.matchMedia('(display-mode: standalone)').matches) {
    //     displayMode = 'standalone';
    //   }
    //   // Log launch display mode to analytics
    //   console.log('DISPLAY_MODE_LAUNCH:', displayMode);
    // });

    // window.addEventListener('DOMContentLoaded', () => {
    //   window.matchMedia('(display-mode: standalone)').addListener((evt) => {
    //     let displayMode = 'browser tab';
    //     if (evt.matches) {
    //       displayMode = 'standalone';
    //     }
    //     // Log display mode change to analytics
    //     console.log('DISPLAY_MODE_CHANGED', displayMode);
    //   });
    // });

    
  }
  async tryLogin(value) {
    const loading = await this.loadingController.create({
      message: "Login...",
    });
    await loading.present();
    this.authService.doLogin(value).subscribe(
      (res) => {
        console.log(res);
        if (res["code"] === 200) {
          loading.dismiss();
          this.errorMessage = "";
          const userInfo = res["data"];
          if (userInfo != null && userInfo.status == 0) {
            this.router.navigate(["/pending"]);
            return;
          }
          if(userInfo != null && userInfo.status == 4){
            console.log("Your account is deleted");
            this.errorMessage = "Your account is deleted";
            return;
          }

          this.authService.userLoggedInSuccessfully();
          
          const deviceKey=localStorage.getItem("deviceID");

          //tokenElement.textContent
          //register devicekey for push notifications
          this.authService.doDeviceRegister(deviceKey).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
            }
            return res;

          }, err => {
            console.log(err);
            alert(err);
          });
          //redirect page
          this.router.navigate(["/app/frime"]);
          // this.authService.doGetProfile().subscribe(res => {
          //   // loading.dismiss();
          //   if (res['code'] === 200) {
          //     const userData = res['data'];

          //     if (userData['status'] != null && userData['status'].toString() == '1') {
          //       this.authService.userLoggedInSuccessfully();
          //       this.router.navigate(["/pending"]);
          //       //this.router.navigate(["/app/frime"]);
          //     } else {

          //     }

          //   } else {
          //     this.authService.doLogout();
          //   }
          // }, err => {
          //   // loading.dismiss();
          //   console.log(err);
          //   this.authService.doLogout();
          // });
        } else if (res["code"] === 205) {
          loading.dismiss();
          this.verifyEmail(value.email);
          this.router.navigate(["/pending"]);
        } else if (res["code"] === 401) {
          loading.dismiss();
          this.errorMessage = "Invalid username or password!";
        }
      },
      (err) => {
        loading.dismiss();
        this.errorMessage = err.message;
        console.log(err);
      }
    );
    //      //register devicekey for push notifications
    //      debugger;
    //      const vapidkey=this.getVapidKey();
    //      debugger;
    // var test= this.authService.doDeviceRegister(vapidkey).subscribe(res => {
    //   debugger;

    //   console.log(res);
    //   alert(res);
    //   if (res['code'] === 200) {
    //     debugger;
    //   }
    //   return res;

    // }, err=>{
    //   debugger; 
    //   console.log(err);
    //    alert(err);});

  }

  
  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

  fetchData() {
    this.apiService.fetch().subscribe(
      (data: Array<Item>) => {
        console.log(data);
        this.items = data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  async verifyEmail(user) {
    const popover_verify = await this.popoverController.create({
      component: VerifyRequestPage,
      componentProps: {
        user: user,
      },
    });
    await popover_verify.present();
  }

  async presentLoading(loading) {
    await loading.present();
  }

  async doFacebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).catch((res) => { console.log(res) });
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userDataInfo) => {
      if (userDataInfo) {
        this.socialUserInfo = userDataInfo;
        const UserInfo = "User Name:" + this.socialUserInfo.name + "\t\n Email: " + this.socialUserInfo.email;
        console.log(userDataInfo);
        // alert(UserInfo);
        // this.registerSocialMediaUser('facebook');
        this.loginSocialUser('facebook');
        return;
      }

      console.log('Login Failed for facebook api: No data found.');
      //
    },
      err => {
        console.log(err);
      });
    // this.fb.showDialog(["email"])
    //   .then((response: FacebookLoginResponse) => {
    //     this.onLoginSuccess(response);
    //     console.log(response.authResponse.accessToken);
    //   }).catch((error) => {
    //     console.log(error)
    //     alert('error:' + error)
    //   });
  }

  // async registerSocialMediaUser(loginProvider: string) {

  //   const fullname: string[] = this.socialUserInfo.name.split(' ');

  //   const values = {
  //     // name: this.socialUserInfo.email.substr(0, this.socialUserInfo.email.indexOf('@')),
  //     // role: 'male',
  //     // email: this.socialUserInfo.email,
  //     // password: this.soicalUserTempPwd
  //     provider: loginProvider, //"facebook" or "google",
  //     email: this.socialUserInfo.email, //"",
  //     user_id: this.socialUserInfo.id, // ""  ,
  //     first_name: fullname[0], //"....",
  //     last_name: fullname.length > 1 ? fullname[1] : '       ', //".....",
  //     photo_url: this.socialUserInfo.photoUrl, //"https://.....",
  //     role: "male",// or "female" or "company",
  //     social_token: this.socialUserInfo.token, //"**********"
  //     username: this.socialUserInfo.email.substr(0, this.socialUserInfo.email.indexOf('@'))
  //   };

  //   this.authService.socialUser = this.socialUserInfo;

  //   const loading = await this.loadingController.create({
  //     message: "Login...",
  //   });
  //   await loading.present();
  //   this.authService.doRegisterSocialUser(values).subscribe(
  //     (res) => {
  //       console.log(res);
  //       loading.dismiss();
  //       if (res["code"] === 200) {
  //         this.loginSocialUser(loginProvider);
  //         // this.tryLogin({ email: this.socialUserInfo.email, password: this.soicalUserTempPwd });
  //       } else if (res["code"] === 422 && res['msg'] === "This user already registered.") {
  //         // this.tryLogin({ email: this.socialUserInfo.email, password: this.soicalUserTempPwd });
  //       } else if (res["code"] === 400 && res['username'] && res['username'][0] === "The username has already been taken.") {
  //         // this.tryLogin({ email: this.socialUserInfo.email, password: this.soicalUserTempPwd });
  //       }
  //       // this.tryLogin({ email: this.socialUserInfo.email, password: this.soicalUserTempPwd });
  //     },
  //     (err) => {
  //       loading.dismiss();
  //       this.errorMessage = err.message;
  //       console.log(err);
  //     }
  //   );
  // }

  async loginSocialUser(loginProvider: string) {
    const values = {
      provider: loginProvider, //"facebook" or "google",
      user_id: this.socialUserInfo.id, // "239485902939495"  ,
      social_token: this.socialUserInfo.token //"**********"
    };

    const loading = await this.loadingController.create({
      message: "Login...",
    });
    await loading.present();
    this.authService.doLoginSocialUser(values).subscribe(
      (res) => {
        loading.dismiss();
        if (res["code"] === 200) {
          this.errorMessage = "";
          this.router.navigate(["/app/frime"]);
          this.authService.userLoggedInSuccessfully();
        } else if (res["code"] === 205) {
        } else if (res["code"] === 401) {
          loading.dismiss();
          this.commonService.socialUser = this.socialUserInfo;
          this.router.navigate(["/auth/signup"]);
          this.errorMessage = "Invalid username or password!";
        } else if (res["code"] == 400) {
          loading.dismiss();
          this.errorMessage = "Invalid username or password!";
        }
      },
      (err) => {
        loading.dismiss();
        this.errorMessage = err.message;
        console.log(err);
      }
    );
  }

  onLoginSuccess(res: FacebookLoginResponse) {
    console.log(res);
    //   //const { token } = res;
    //   const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    //   this.fireAuth.auth.signInWithCredential(credential)
    //     .then((response) => {
    //       this.router.navigate(["app/frime"]);
    //       this.loading.dismiss();
    //   });

  }
  onLoginError(err) {
    console.log(err);
  }

  goStarted() {
    this.router.navigate(["/getting-started"]);
  }

  async doGoogleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userDataInfo) => {
      if (userDataInfo) {
        this.socialUserInfo = userDataInfo;
        const UserInfo = "User Name:" + this.socialUserInfo.name + "\t\n Email: " + this.socialUserInfo.email;
        console.log(userDataInfo);
        // this.registerSocialMediaUser('google');
        this.loginSocialUser('google');

        // alert(UserInfo);
        return;
      }
      console.log('Login Failed for google api: No data found');
    },
      err => {
        console.log(err);
      });
    // const loading = await this.loadingController.create({
    //   message: "Login...",
    // });
    // await loading.present();

    // this.googlePlus.login({}).then(
    //   (user) => {
    //     loading.dismiss();
    //     console.log(user);
    //     loading.dismiss();
    //   },
    //   (err) => {
    //     console.log(err);
    //     loading.dismiss();
    //   }
    // );
  }

  goSignupPage() {
    this.router.navigate(["/auth/signup"]);
  }



  goToForgotPassword(): void {
    console.log("redirect to forgot-password page");
  }

  async openForgotPopup() {
    const popover = await this.popoverController.create({
      component: ForgotPasswordPage,
    });

    await popover.present();
  }

  async openVerifyPopup() {
    const popover = await this.popoverController.create({
      component: VerifyRequestPage,
    });

    await popover.present();
  }

  

  
 

}
