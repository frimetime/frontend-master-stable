import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { environment } from "../../environments/environment";
declare var gtag;
@Component({
  selector: "app-terms",
  templateUrl: "./terms.page.html",
  styleUrls: ["./terms.page.scss"],
})
export class TermsPage implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "terms page",
      page_path: "/terms",
    });
  }

  myBackButton() {
    this.location.back();
  }
}
