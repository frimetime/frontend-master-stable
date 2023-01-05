import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { environment } from "../../environments/environment";
declare var gtag;
@Component({
  selector: "app-policy",
  templateUrl: "./policy.page.html",
  styleUrls: ["./policy.page.scss"],
})
export class PolicyPage implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "policy page",
      page_path: "/policy",
    });
  }

  myBackButton() {
    this.location.back();
  }
}
