import { Component, OnInit } from "@angular/core";
import { NavParams, PopoverController } from "@ionic/angular";
import { environment } from "../../../environments/environment";
declare var gtag;
@Component({
  selector: "app-frime-request-sent",
  templateUrl: "./frime-request-sent.page.html",
  styleUrls: ["../popover.page.scss"],
})
export class FrimeRequestSentPage implements OnInit {
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "frime request sent page",
      page_path: "/frimerequestsent",
    });
  }

  closePopover() {
    this.popoverController.dismiss();
  }
}
