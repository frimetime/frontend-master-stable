import { Component, OnInit } from "@angular/core";
import { NavParams, PopoverController } from "@ionic/angular";
import { environment } from "../../../environments/environment";
declare var gtag;
@Component({
  selector: "app-already-request-sent",
  templateUrl: "./already-request-sent.component.html",
  styleUrls: ["./already-request-sent.component.scss"],
})
export class AlreadyRequestSentComponent implements OnInit {
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "Already Request Sent page",
      page_path: "/alreadyrequestsent",
    });
  }

  closePopover() {
    this.popoverController.dismiss();
  }
}
