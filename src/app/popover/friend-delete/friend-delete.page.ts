import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { UserService } from '../../user/user.service';

import { environment } from "../../../environments/environment";
declare var gtag;
@Component({
  selector: "app-friend-delete",
  templateUrl: "./friend-delete.page.html",
  styleUrls: ["../popover.page.scss"],
})
export class FriendDeletePage implements OnInit {
  private friend_id: string;
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private user: UserService
  ) {
    this.friend_id = this.navParams.get('friend_id');
  }

  ngOnInit() {
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "friend delete page",
      page_path: "/friendelete",
    });
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  async deleteFriend() {

    this.user.doDeleteFriend(this.friend_id).subscribe(res => {
      console.log(res);
     
      this.popoverController.dismiss(res);
    }, err => {
      console.log(err);
    });
  }
}
