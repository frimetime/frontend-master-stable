import { Component, OnInit, HostBinding } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { UserService } from "../user.service";
import { LoadingController, PopoverController, Platform, ToastController } from "@ionic/angular";
import { FriendAddPage } from "../../popover/friend-add/friend-add.page";
import { FrimeRequestSentPage } from "../../popover/frime-request-sent/frime-request-sent.page";
import { AlreadyRequestSentComponent } from "../../popover/already-request-sent/already-request-sent.component";
import { FriendDeletePage } from '../../popover/friend-delete/friend-delete.page';
import { environment } from "../../../environments/environment";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { Capacitor } from '@capacitor/core';
import { Storage } from '@ionic/storage';
import { AuthService } from '..//../services/auth.service';
declare var gtag;
@Component({
  selector: "app-user-friends",
  templateUrl: "./user-friends.page.html",
  styleUrls: [
    "./styles/user-friends.page.scss",
    "./styles/user-friends.shell.scss",
    "./styles/user-friends.md.scss",
  ],
})
export class UserFriendsPage implements OnInit {
  segmentValue = "frimers";
  frimerList: Array<any> = [] as any[];
  followersList: Array<any>;
  followingList: Array<any>;
  userDataList: Array<any>;
  friendsList: Array<any>;
  searchQuery = "";
  showFilters = false;
  private OnFormInit: boolean;

  @HostBinding("class.is-shell") get isShell() {
    // return (this.data && this.data.isShell) ? true : false;
    return false;
  }

  constructor(
    //private route: ActivatedRoute,
    private location: Location,
    private loadingController: LoadingController,
    private popoverController: PopoverController,
    private socialSharing: SocialSharing,
    private platform: Platform, public toastController: ToastController,
    private user: UserService,
    private ngNavigatorShareService: NgNavigatorShareService,
    private storage: Storage,
    private authService: AuthService, 
  ) { }

  ngOnInit(): void {
    this.followersList = [];
    this.followingList = [];
    // this.friendsList = this.route.snapshot.data['data']['data'];
    // this.getFrimersList();
    this.OnFormInit = true;
    this.searchList();
    // this.getFriendsList();
    //Google analytics    
    gtag("config", environment.firebase.trackerID, {
      page_title: "user friends page",
      page_path: "/userfriends",
    });
  }

  shareLink() {
    //TODO - add function for sharing https://frimetime.com - link via other apps
    // Check if sharing via email is supported
    if (Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() ==='android') {
      alert('its calling on cordova platform')
      this.socialSharing.canShareViaEmail().then(() => {
        // Sharing via email is possible
      }).catch((err) => {
        // Sharing via email is not possible
 
      });

      // Share via email
      this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });

    }
    else {
      var url = "https://frimetime.com/";
      var social_message: "Hey, join us on Frimetime https://frimetime.com/";
      this.shareViaweb(url, social_message);
    }

  }
  shareViaweb(url, social_message) {
    if (!this.ngNavigatorShareService.canShare()) {
      // when canShare not suppported 
      this.fornotSupprotedBrowsers(url, social_message);
    }
    else {
      this.ngNavigatorShareService.share({
        title: 'FrimeTime',
        text: social_message,
        url: url ? url : '',
      }).then((response) => {
        console.log(response);
      })
        .catch((error) => {
        });

    }
  }
  fornotSupprotedBrowsers(url, social_message) {
    const share = {
      displayNames: true,
      config: [
        {
          facebook: {
            socialShareUrl: url,
            socialShareText: social_message,
            socialSharePopupWidth: 400,
            socialSharePopupHeight: 400
          }
        },
        {
          twitter: {
            socialShareUrl: url,
            socialShareText: social_message,
            socialSharePopupWidth: 300,
            socialSharePopupHeight: 400
          }
        },
        {
          whatsapp: {
            socialShareText: social_message,
            socialShareUrl: url,

          }
        },

        {
          email: {
            socialShareBody: social_message
          }
        },
        {
          copy: {
            socialShareUrl: url,
            socialShareText: social_message,

          }
        }
      ]
    };
    const elem: any = document.getElementsByTagName("web-social-share");
    if (elem && elem.length > 0) {
      elem[0].share = share;
    }
    const elem1: any = document.getElementsByTagName("web-social-share");
    if (elem && elem.length > 0) {
      elem[0].show = true;
    }

  }
  shareCode(code) {
    this.socialSharing.canShareViaEmail().then(() => {
      // this.socialSharing
      //   .share(`Here is your code: ${code}`)
      //   .then(() => {
      //     log.debug('code has been shared?');
      //   });
    });
  }


  async getFriendsList() {
    
    // TODO - add friendlist function to show friends of user
    // const loading = await this.loadingController.create({
    //   message: "Loading...",
    // });
    // await loading.present();
    this.user.doGetFriendList().subscribe(
      (res) => {
        console.log(res);
        if (res["code"] === 200) {
          //loading.dismiss();
          this.friendsList = res["data"];
          this.followersList = this.friendsList;
          if (
            this.friendsList != null &&
            this.friendsList.length > 0 &&
            this.searchQuery != null &&
            this.searchQuery.length >= 0
          ) {
            // this.searchList();
          }
          if (this.OnFormInit) {
            this.getFrimersList();
            this.OnFormInit = false;
          }
        } else {
          //loading.dismiss();
        }
      },
      (err) => {
        //loading.dismiss();
        console.log(err);
      
      }
    );
  }

  async getFrimersList() {
    // const loading = await this.loadingController.create({
    //   message: "Loading...",
    // });
    //await loading.present();
    this.user.doGetUserList().subscribe(
      (res) => {
        console.log(res);
        if (res["code"] === 200) {
          //loading.dismiss();
          this.userDataList = res["data"];
          this.userDataList = this.userDataList.filter(u => u.id != this.user.profile.id);
          if (this.friendsList && this.friendsList.length > 0) {
            this.userDataList = this.userDataList.filter(u => this.friendsList.find(f => u.id == f.id) == null);
          }

          this.frimerList = this.userDataList;

          if (
            this.userDataList != null &&
            this.userDataList.length > 0 &&
            this.searchQuery != null &&
            this.searchQuery.length >= 0
          ) {
            this.searchList();
          }
        } else {
          //loading.dismiss();
        }
      },
      (err) => {
        //loading.dismiss();
        console.log(err);
      }
    );
  }

  segmentChanged(ev): void {
    this.segmentValue = ev.detail.value;

    // Check if there's any filter and apply it
    this.searchList();
  }

  searchList(): void {
    const query =
      this.searchQuery && this.searchQuery !== null ? this.searchQuery : "";
      this.getFriendsList();
    if (this.segmentValue === "followers") {
      if (this.friendsList == null || this.friendsList.length <= 0) {
        this.getFriendsList();
        return;
      }
      this.followersList = this.filterList(this.friendsList, query);
    } else if (this.segmentValue === "frimers") {
      if (this.userDataList == null || this.userDataList.length <= 0) {
        this.getFrimersList();
        return;
      }
      this.frimerList = this.filterList(this.userDataList, query);
      // } else if (this.segmentValue === 'following') {
      //   this.followingList = this.filterList(this.data.following, query);
    }
  }

  filterList(list, query): Array<any> {
    return list.filter((item) =>
      item.username.toLowerCase().includes(query.toLowerCase())
    );
  }

  myBackButton() {
    this.location.back();
  }

  async openPopover(frimer) {
    const popover = await this.popoverController.create({
      component: FriendAddPage,
      componentProps: {
        user: frimer,
      },
    });

    await popover.present();
    popover.onDidDismiss().then(async (value) => {
      console.log(value);
      if (value.data == null) {
        return;
      }
      const res = value.data;
      if (res["code"] === 200) {
        // const loading = await this.loadingController.create({
        //   message: "Loading...",
        // });
        // await loading.present();
        this.userDataList = this.userDataList.filter(f => f.id != frimer.id);
        //this.frimerList = this.userDataList;
        //this.friendsList.push(frimer);
        //this.followersList = this.friendsList;
        //loading.dismiss();
        const popover = await this.popoverController.create({
          component: FrimeRequestSentPage,
          componentProps: {
            custom_id: "",
          },
        });
        popover.present();
      } else if (res["code"] === 422) {
        const popover = await this.popoverController.create({
          component: AlreadyRequestSentComponent,
          componentProps: {
            custom_id: "",
          },
        });
        popover.present();
      }
    });
  }

  async doBlockFriend(friend_id: string) {
    // const loading = await this.loadingController.create({
    //   message: 'Loading...'
    // });
    // await loading.present();
    this.user.doBlockFriend(friend_id).subscribe(res => {
      console.log(res);
      if (res['code'] === 200) {
       // loading.dismiss();
      } else {
       // loading.dismiss();
      }
    }, err => {
      //loading.dismiss();
      console.log(err);
    });
  }

  async doUnblockFriend(friend_id: string) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.user.doUnblockFriend(friend_id).subscribe(res => {
      console.log(res);
      if (res['code'] === 200) {
        loading.dismiss();

      } else {
        loading.dismiss();
      }
    }, err => {
      loading.dismiss();
      console.log(err);
    });
  }

  async doDeleteFriendPopover(friend) {
    const popover = await this.popoverController.create({
      component: FriendDeletePage,
      componentProps: {
        friend_id: friend.id
      },
    });

    await popover.present();
    popover.onDidDismiss().then(async (value) => {
      console.log(value);
      // const loading = await this.loadingController.create({
      //   message: "Loading...",
      // });
      // await loading.present();
      if (value.data != null && value.data['code'] == 200) {
        // this.followersList = this.followersList.filter(f => f.id != friend_id);

        this.friendsList = this.friendsList.filter(f => f.id != friend.id);
        this.followersList = this.friendsList;
        this.userDataList.push(friend);
        this.frimerList = this.userDataList;
        //loading.dismiss();
        return;
      }

      //loading.dismiss();
    });
  }
  async presentMessage(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      cssClass: 'bottom-toast',
      color: 'dark'
    });
    toast.present();
  }
}
