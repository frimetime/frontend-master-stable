import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NavController, PopoverController, LoadingController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { environment } from "../../environments/environment";
import { Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FCM } from "@ionic-native/fcm/ngx";
import { Platform } from "@ionic/angular";
import { debug } from 'console';
import { json } from '@angular-devkit/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { UserService } from "../user/user.service";
 import * as  localforage from "localforage";
import { IfStmt } from '@angular/compiler';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Storage } from '@ionic/storage';
// import { test } from '@angular-devkit/core/src/virtual-fs/host';
// import { ProjectDefinitionCollection } from '@angular-devkit/core/src/workspace';
declare var gtag;

export function SetNotifications(payload){
  alert('hahhaa I am called globally' + payload);
  }

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})



export class GroupsPage implements OnInit, OnDestroy {

  currentUser: any = {};
  todos: any[] = [];
  todo: any = {};
  frimegroups: any[];
  public userId: any;
  private navigationSubscription: Subscription;
  public title: any;
  public body: any;
  public tag: any;
  NotificationsForGroupPage: any[];

  constructor(
    private todoService: TodoService,
    private nav: NavController,
    private loadingController: LoadingController,
    private popoverController: PopoverController,
    private fcm: FCM,
    private plt: Platform,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService, 
    private userServ: UserService,
    private storage: Storage,
  ) { 

      this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          //Here we can get the data using data.actionType and data.payload and use it accordingly
          if (data.wasTapped) {
               console.log("Received in background");
          } else {
               console.log("Received in foreground");
        };
       });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
        setInterval(() => {         
          //replaced function() by ()=>
           // this.ngOnInit();
            this.getNotifications();
          // just testing if it is working
        }, 10000);
      })
    }

      subscribeToTopic() {
        this.fcm.subscribeToTopic('enappd');
      }
      getToken() {
        this.fcm.getToken().then(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      }
      unsubscribeFromTopic() {
        this.fcm.unsubscribeFromTopic('enappd');
      }
  
  

  ngOnInit() {
      this.getNotifications(); 
   
     this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd && e.url == '/app/groups') {
        this.getUser();
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
    // this.getUser();
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "groups page",
      page_path: "/groups",
    });
  //});
  }
    // const notificationdata=[];
    // const ls=JSON.parse(localStorage.getItem("data"));
    // if(ls != null)
    // notificationdata.push(ls);
   // console.log("JSON PArsed Data= "+ JSON.parse(localStorage.getItem("data")));
      // const t= '';
      // localforage.setItem("data", JSON.stringify(t));
      // localStorage.setItem("data", JSON.stringify(t));
   //const bgnotification="";
  //  const flsd=localforage.getItem("data");
  //  const fls=JSON.parse(flsd.toString());
  //  if(fls!=null)
  //   notificationdata.push(fls);
    //const bgNoti= bgnotification;


      // const bgNotification =  localforage.getItem('data', function (err, value) {
      //    if (err) {
      //        console.error('Oh noes! ' + err );
      //    } else {
      //        console.log(value);
      //         value = value.toString().replace('"[{', '[{');
      //        // value = value.toString().replace('"[{', '[{');
      //         value = value.toString().replace(']"', ']');
      //        // value = value.toString().replace(']"', ']');
      //       if(value != null)
      //       {
      //         const jValue = JSON.parse(value.toString());
      //         notificationdata.push(jValue);
      //       }
      //      //this.NotificationsForGroupPage = notificationdata;
      //    }
      // });
    //this.NotificationsForGroupPage = notificationdata;
   
    // this.NotificationsForGroupPage.forEach(function (value) {
    //   //value.data.notification.body = JSON.parse(value.data.notification.body);
    //   value.forEach(function (i) {
    //     //this.AllNotificationsForGroupPage.push(i);
    //     console.log(i.notification.tag);
    //   });
      
    // });
   
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe()
    }
  }

  async getUser() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.todoService.doGetProfile()
      .subscribe(res => {
        // console.log(res);
        if (res['code'] === 200) {
          loading.dismiss();
          const userData = res['data'];
          this.userId = {
            username: userData['username'],
            firstname: userData['firstname'],
            lastname: userData['lastname'],
            image: userData['image'],
            email: userData['email'],
            country: userData['country'],
            role: userData['role'],
            sex: userData['role'],
            birthdate: userData['birthday'],
            name: userData['firstname'] + ' ' + userData['lastname'],
            id: userData['id']
          };
          // this.getTodos();
          this.getActiveTodos();
        } else {
          loading.dismiss();
        }
      }, async err => {
        loading.dismiss();
        console.log(err);
        // const response = await this.authService.refreshToken().toPromise<any>();
        // if ((err.status == 401 || err.statusText == 'Unauthorized')) {
        //   this.navigationSubscription.unsubscribe();
        //   this.authService.isLoggedIn = new BehaviorSubject(false);
        //   this.authService.doLogout();
        //   this.router.navigate(["auth/login"]);
        // }
      });
  }
  formatNotificationTime(da) {
    let dd = da + " UTC";
    let date = new Date(dd);
    var currDate = new Date();
    var diffMs=currDate.getTime() - new Date(dd).getTime();
    var sec=diffMs/1000;
    if(sec<60)
        return parseInt(sec.toString())+' second'+(parseInt(sec.toString())>1?'s':'')+' ago';
    var min=sec/60;
    if(min<60)
        return parseInt(min.toString())+' minute'+(parseInt(min.toString())>1?'s':'')+' ago';
    var h=min/60;
    if(h<24)
        return parseInt(h.toString())+' hour'+(parseInt(h.toString())>1?'s':'')+' ago';
    var d=h/24;
    if(d<30)
        return parseInt(d.toString())+' day'+(parseInt(d.toString())>1?'s':'')+' ago';
    var m=d/30;
    if(m<12)
        return parseInt(m.toString())+' month'+(parseInt(m.toString())>1?'s':'')+' ago';
    var y=m/12;
    return parseInt(y.toString())+' year'+(parseInt(y.toString())>1?'s':'')+' ago';
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
acceptFriendRequest(invite_id, id)
{
  debugger;
  this.userServ.doAcceptFriendRequest(invite_id).subscribe(res => {
    if (res['code'] === 200) {
     this.deleteNotifications(id);
    }
  }, err => {

    //this.errorMessage = err.message;
    console.log(err);
  });
}
deleteNotifications(id)
{
  this.userServ.doDeleteNotification(id).subscribe(res => {
    if (res['code'] === 200) {
      this.getNotifications();
    }
  }, err => {
    //this.errorMessage = err.message;
    console.log(err);
  });
}
deleteAllNotifications()
{
  debugger;
  this.userServ.doDeleteAllNotification().subscribe(res => {
    if (res['code'] === 200) {
      this.getNotifications();
    }
  }, err => {
    console.log(err);
  });
}
getNotifications()
{
  return this.todoService.getNotifications()
  .subscribe(res => {
    if (res['code'] === 200) {
      const userNotifications: any[] = res['data'].notifications;
      this.NotificationsForGroupPage = [] as any[];
      if (userNotifications && userNotifications.length > 0) {
        userNotifications.forEach(uf => {
          var createdAt = uf.created_at.replace("T", " ");
          createdAt = createdAt.replace(".000000Z", "");
          let timeago = this.formatNotificationTime(createdAt);
        uf.message = JSON.parse(uf.message);
            this.NotificationsForGroupPage.push({
              title: uf.message.title,
              body: uf.message.body,
              icon: uf.message.icon,
              Id:uf.id,
              time:timeago,
            });
        });
      }
    }
  }, err => {
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
  });
}

AcceptFrimeRequest(request_id, id) {
  debugger;
  this.todoService.acceptFriendtoFirme(request_id).subscribe(
    async (res) => {
       if (res['code'] === 200) {
        this.deleteNotifications(id);
       }
    },
    (err) => {
      console.log(err);
    }
  );
}
rejectFrimeRequest(request_id, id) {
  this.todoService.rejectFriendtoFirme(request_id).subscribe(
    async (res) => {
     // this.popoverController.dismiss(res);
       if (res['code'] === 200) {
        this.deleteNotifications(id);
       }
    },
    (err) => {
      console.log(err);
    }
  );
}
    getActiveTodos() {
    // Get Friends frimes
    this.todoService.getGroupTodos().subscribe(res => {
      // console.log(res);
      if (res['code'] === 200) {
        // console.log(res['data']);
        const userFrimes: any[] = res['data'];
        this.frimegroups = [];
        if (userFrimes && userFrimes.length > 0) {
           userFrimes.forEach(uf => {
           var timeofFrime=this.formatAMPM(uf.start_at);
             if (!this.todoService.isFrimeExpired(uf.start_at)) {
                this.frimegroups.push({
                  owner: uf.owner.username,
                  title: uf.title,
                  image: uf.image,
                  message: uf.description,
                  date: uf.start_at,
                  time:timeofFrime,
                  max: uf.max,
                  guests: uf.member.length, //uf.guests == null ? 0 : uf.guests,
                  frime_id: uf.id,
                  status: uf.status,
                  user_id: uf.owner.id,
                  username: uf.owner.username,
                  userimage: uf.owner.image
                });
             
             }
            // this.getOthersInvites(uf.id);
           });

          //this.getFriendsTodos();
        }
        
      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });
  }

  getFriendsTodos() {
    // Get Friends frimes

    //TODO this.todoService.getActiveTodos().subscribe(res => {
    this.todoService.getFriendsTodos(true).subscribe(res => {
      // console.log(res);
      if (res['code'] === 200) {
        // console.log('friendsFrimes');
        // console.log(res['data']);
        const friendsFrimes: any[] = res['data'];
        // this.frimegroups = [];
        if (friendsFrimes && friendsFrimes.length > 0) {
          friendsFrimes.forEach(ff => {
           
            if (ff.frimes && ff.frimes.length > 0) {
              ff.frimes.forEach(frime => {
                var timeofFrime=this.formatAMPM(frime.start_at);
                if (!this.todoService.isFrimeExpired(frime.start_at)) {
                  this.frimegroups.push({
                    owner: ff.username,
                    title: frime.title,
                    image: frime.image,
                    message: frime.description,
                    date: frime.start_at,
                    time: timeofFrime,
                    max: frime.max,
                    guests: frime.guests == null ? 0 : frime.guests,
                    frime_id: frime.id,
                    status: frime.status,
                    user_id: ff.id,
                    username: ff.username,
                    userimage: ff.image
                  });
                }
              });
            }
          });

          console.log(this.frimegroups);
        }
        // } else if (res['code'] === 205) {

        // } else if (res['code'] === 401) {

      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });
  }
  async openChat(event, item) {

    this.commonService.current_user = this.userId;
    if (item.username == this.userId.username) {
      this.commonService.isFriendFrime = false;
    } else {
      this.commonService.isFriendFrime = true;
      this.commonService.otherFrimeUser = { id: item.user_id, username: item.username, image: item.userimage };
    }

    this.commonService.selected_frime = item;
    this.router.navigate(['/chat']);
  }

  getInvites() {
    this.todoService.getOwnInvitesAsGuest().subscribe(res => {
      console.log(res);
      if (res['code'] === 200) {
        console.log('getInvites');
        // console.log(res['data']);
      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });
  }

  getOthersInvites(frime_id: string) {
    this.todoService.getInvitesForOwnFrime(frime_id).subscribe(res => {
      //console.log(res);
      if (res['code'] === 200) {
        //console.log('getOthersInvites');
        // console.log(res['data']);

      }
    }, err => {
      //this.errorMessage = err.message;
      console.log(err);
    });
  }

  rejectFirendRequest(invite_id, id) {
    debugger;
    this.todoService.acceptFriendInvitation(invite_id, "no").subscribe(res => {
      // console.log(res);
      if (res['code'] === 200) {
        console.log(res['data']);
        this.deleteNotifications(id);

      } else {

      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });
  }

  acceptFriendInvitation(invite_id: string) {
    this.todoService.acceptFriendInvitation(invite_id, "yes").subscribe(res => {
      // console.log(res);
      if (res['code'] === 200) {
        console.log(res['data']);

      } else {

      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });
  }

  rejectFrimeInvitation(request_id: string) {
    this.todoService.acceptFrimeInvitation(request_id, "no").subscribe(res => {
      // console.log(res);
      if (res['code'] === 200) {
        console.log(res['data']);
      } else {

      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });
  }

  acceptFrimeInvitation(request_id: string) {
    this.todoService.acceptFrimeInvitation(request_id, "yes").subscribe(res => {
      // console.log(res);
      if (res['code'] === 200) {
        console.log(res['data']);
      } else {

      }
    }, err => {

      //this.errorMessage = err.message;
      console.log(err);
    });
  }
}
