import { Component, OnInit } from "@angular/core";
import {
  NavParams,
  PopoverController,
  LoadingController,
} from "@ionic/angular";
import { UserService } from "../../user/user.service";
import { environment } from "../../../environments/environment";
declare var gtag;
@Component({
  selector: "app-friend-add",
  templateUrl: "./friend-add.page.html",
  styleUrls: ["../popover.page.scss"],
})
export class FriendAddPage implements OnInit {
  userFriend: { id: number; username: string; image: string };

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private loadingController: LoadingController,
    private userServ: UserService
  ) {
    this.userFriend = this.navParams.get("user");
  }

  ngOnInit() {
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "friend add page",
      page_path: "/friendadd",
    });
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  async sendFriendRequest() {
    // const loading = await this.loadingController.create({
    //   message: "Loading...",
    // });
    //await loading.present();
    console.log(this.userFriend);
    this.userServ.doAddFriendRequest(this.userFriend.id).subscribe(
      (res) => {
        console.log(res);
        if (res["code"] === 200) {
          console.log("Request is sent successfully.");
        }

       // loading.dismiss();
        this.popoverController.dismiss(res);
      },
      (err) => {
        //loading.dismiss();
        console.log(err);
      }
    );
  }
}
