import { Todo, TodoService } from "../services/todo.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Storage } from '@ionic/storage';
import {
  NavController,
  PopoverController,
  LoadingController,
} from "@ionic/angular";
import { PopoverPage } from "../popover/popover.page";
import { FrimeRequestPage } from "../popover/frime-request/frime-request.page";
import { FrimeRequestSentPage } from "../popover/frime-request-sent/frime-request-sent.page";
import { FrimeCancelPage } from "../popover/frime-cancel/frime-cancel.page";
import { AlreadyRequestSentComponent } from "../popover/already-request-sent/already-request-sent.component";
import { FrimeFullPage } from "../popover/frime-full/frime-full.page";
import { CommonService } from "../services/common.service";
import { environment } from "../../environments/environment";
import { Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { InvitiesRequestsModel } from './invites-requests.model';
declare var gtag;
@Component({
  selector: "app-frimelist",
  templateUrl: "./frimelist.page.html",
  styleUrls: ["./frimelist.page.scss"],
})
export class FrimelistPage implements OnInit, OnDestroy {
  todos: any[];
  notifications: any[];
  public userInfo: any;
  value = 0;
  frimeStatus=1;
  private navigationSubscription: Subscription;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private nav: NavController,
    private loadingController: LoadingController,
    private popoverController: PopoverController,
    private router: Router,
    private commonService: CommonService,
    private storage: Storage,
    private authService: AuthService
  ) {
    // this.afAuth.authState.subscribe(user => {
    //     this.userInfo = user.uid;
    //     console.log('userID stored correct? ', this.userInfo);
    //   });
  }
 
    

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd && e.url == '/app/frimelist') {
        //this.getUser();
      
          this.getFriendsTodos();
          this.getTodos();
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
      // this.navigationSubscription.unsubscribe();
    });
    // this.getUser();
    // if (this.route && this.route.data) {
    //   this.route.data.subscribe(resolvedData => {
    //     const dataSource = resolvedData['data'];
    //     if (dataSource) {
    //       dataSource.source.subscribe(pageData => {
    //         if (pageData) {
    //           // this.notifications = pageData;
    //         }
    //       });
    //     }
    //   });
    // }
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "frimelist page",
      page_path: "/frimelist",
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  async remove(item) {
    const popover = await this.popoverController.create({
      component: FrimeCancelPage,
      componentProps: {
        frime_id: item.frime_id,
      },
      backdropDismiss: false,
    });

    popover.present();
    popover.onDidDismiss().then(async (value) => {
      console.log(value);
      if (value.data) {
        // const todoindex = this.todos.findIndex(todo=> todo.frime_id == item.frime_id);
        this.todos = this.todos.filter(
          (todo) => todo.frime_id != item.frime_id
        );
      }
    });
  }

  async getUser() {
    const loading = await this.loadingController.create({
      message: "Loading...",
    });
    await loading.present();
    this.todoService.doGetProfile().subscribe(
      (res) => {
        console.log("user data on frimelist page");
        console.log(res);
        if (res["code"] === 200) {
          loading.dismiss();
          const userData = res["data"];
          this.userInfo = {
            username: userData["username"],
            firstname: userData["firstname"],
            lastname: userData["lastname"],
            email: userData["email"],
            country: userData["country"],
            role: userData["role"],
            sex: userData["role"],
            birthdate: userData["birthday"],
            name: userData["firstname"] + " " + userData["lastname"],
            image: userData["image"],
            id: userData["id"]
          };
          this.getTodos();
          //this.getFriendsTodos();
        } else {
          loading.dismiss();
        }
      },
      async (err) => {
        loading.dismiss();
        console.log(err);
        if (err['status'] === 401) {
          this.storage.get('token').then((token) => {
            if (token != null && token.length > 0) {
              // if (state) {
              this.authService.isLoggedIn.next(true);
             // this.router.navigate(["/app/frime"]);
              this.authService.refreshToken()
                .subscribe((res) => {
                  if (res['code'] === 200) {
                    this.authService.token = res['token'];
                    this.authService.userLoggedInSuccessfully();
                  }
                }, err => {
                  console.log(err);
                  if ((err.status == 401 || err.statusText == 'Unauthorized')) {
                    // this.navigationSubscription.unsubscribe();
                    this.authService.isLoggedIn = new BehaviorSubject(false);
                    // this.authService.doLogout();
                    this.storage.clear();
                    this.authService.storage.clear();
                    this.router.navigate(["auth/login"]);
                  }
                });
            } else {
              this.router.navigate(["auth/login"]);
            }
          }, (err) => {
            console.log(err);
            this.router.navigate(["auth/login"]);
          });
        }
        // const response = await this.authService.refreshToken().toPromise<any>();
        // if ((err.status == 401 || err.statusText == 'Unauthorized')) {
        //   this.navigationSubscription.unsubscribe();
        //   this.authService.isLoggedIn = new BehaviorSubject(false);
        //   this.authService.doLogout();
        //   this.router.navigate(["auth/login"]);
        // }
      }
    );
  }

  getTodos() {
    this.todoService.getTodos().subscribe(res => {
      // console.log(res);
      if (res['code'] === 200) {
        // console.log(res['data']);
        const userFrimes: any[] = res['data'];
        this.todos = [] as any[];
        console.log(userFrimes);
        if (userFrimes && userFrimes.length > 0) {
          userFrimes.forEach(uf => {
            var timeofFrime=this.formatAMPM(uf.start_at);
            if (!this.todoService.isFrimeExpired(uf.start_at)) {
              this.todos.push({
                owner: uf.owner.username, // this.userInfo.username,
                title: uf.title,
                message: uf.description,
                date:  uf.start_at,
                time: timeofFrime,
                max: uf.max,
                guests: uf.member.length, //uf.guests == null ? 0 : uf.guests,
                frime_id: uf.id,
                status: uf.status,
                user_id: uf.user_id,
                image : uf.owner.image,
              });
            }
          });
        }
        //this.getFriendsTodos();
      } else if (res['code'] === 205) {

      } else if (res['code'] === 401) {

      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });

  }
  formatAMPM(d) {
    let dd = d + " UTC";
    let date = new Date(dd);
    //var date = new date(d);
   var hours = date.getHours();
   var minutes = date.getMinutes();
   var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var min = minutes < 10 ? '0'+minutes : minutes;
   var strTime = hours + ':' + min + ' ' + ampm;
   return strTime;
 }

  getFriendsTodos() {
    // Get Friends frimes
    this.todoService.getFriendsTodos().subscribe(
      (res) => {
        // console.log(res);
        if (res["code"] === 200) {
          //  console.log(res['data']);
          const frinedsFrimes: any[] = res["data"];
          this.notifications = [] as any[];
          if (frinedsFrimes && frinedsFrimes.length > 0) {
            frinedsFrimes.forEach((ff) => {
              const frimes: any[] = ff.frimes;
              if (frimes && frimes.length > 0) {
                for (let frime of frimes) {
                  var timeofFrime=this.formatAMPM(frime.start_at);
                  if (!this.todoService.isFrimeExpired(frime.start_at)) {
                    this.notifications.push({
                      user_id: ff.id,
                      image: ff.image,
                      name: ff.username,
                      title: frime.title,
                      message: frime.description,
                      date: frime.start_at,
                      time: timeofFrime,
                      max: frime.max,
                      guests: frime.member.length,//frime.guests == null ? 0 : frime.guests,
                      frime_id: frime.id,
                      requestedByCurrentUser: false,
                      // status: frime.status,
                      isaccepted: frime.is_accepted,
                      isrequested: frime.is_requested,
                    });

                    //this.getOthersInvites(frime.id);
                  }
                }
              }
            });
          }
        } else if (res["code"] === 205) {
        } else if (res["code"] === 401) {
        }
      },
      (err) => {
        //this.errorMessage = err.message;
        console.log(err);
      }
    );
  }

  getOthersInvites(frime_id: string) {
    this.todoService.getInvitesForOwnFrime(frime_id).subscribe(res => {
      //console.log(res);
      if (res['code'] === 200) {
       // console.log('getOthersInvites');
        // console.log(res['data']);
        const invites_requests: InvitiesRequestsModel = res['data'];
        const friendsfrimeIndex = this.notifications.findIndex(ff => ff.frime_id == frime_id);
        const invites = res['data'];
        for (let i of invites_requests.invites) {
          // if (i.guest_id.toString() == this.userInfo.id.toString())
          // {
           if(i.status.toString() != "2")
           {
            this.notifications[friendsfrimeIndex].requestedByCurrentUser = true;
           }
        //}
        }
        // if (invites_requests.requests.findIndex(inv => inv.guest_id.toString() == this.userInfo.id.toString()) > -1)
        // {
        //   if(invites_requests.requests.findIndex(inv => inv.status.toString() == this.frimeStatus.toString()))
        //   {
        //     this.notifications[friendsfrimeIndex].requestedByCurrentUser = true;
        //   }
          
        // }
      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });
  }

  async openChat(event, item) {
    this.commonService.selected_frime = item;
    this.commonService.current_user = this.userInfo;
    this.router.navigate(["/chat"]);
  }

  async openPopover(event, notification) {
    if (notification.requestedByCurrentUser) {
      this.commonService.selected_frime = notification;
      this.commonService.current_user = this.userInfo;
      this.router.navigate(["/chat"]);
      
      // const popover = await this.popoverController.create({
      //   component: AlreadyRequestSentComponent,
      //   componentProps: {
      //     custom_id: "", hit enter+k and then enter+c or enter+u
      //   },
      // });
      // popover.present();
       return;
    }

    const popover = await this.popoverController.create({
      component: FrimeRequestPage,
      componentProps: {
        frime_id: notification.frime_id,
      },
      backdropDismiss: false,
    });

    popover.present();
    popover.onDidDismiss().then(async (value) => {
      console.log(value);
      const res = value.data;
      if (res["code"] === 200) {
        this.getOthersInvites(notification.frime_id);
        const popover = await this.popoverController.create({
          component: FrimeRequestSentPage,
          componentProps: {
            custom_id: "",
          },
        });
        popover.present();
       // requestedByCurrentUser
       //this.notifications[friendsfrimeIndex].requestedByCurrentUser = true;
      } else if (res["code"] === 422) {
        if(res["error"]["msg"] =='Maximum counter')
        {
          const popover = await this.popoverController.create({
            component: FrimeFullPage,
            componentProps: {
              custom_id: "",
            },
          });
          popover.present();
        }
        else{
        const popover = await this.popoverController.create({
          component: AlreadyRequestSentComponent,
          componentProps: {
            custom_id: "",
          },
        });
      }
        popover.present();
      }
    });
  }
}