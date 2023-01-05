import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { environment } from "../../environments/environment";
declare var gtag;
@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.page.html",
  styleUrls: ["./styles/page-not-found.page.scss"],
})
export class PageNotFound implements OnInit {
  constructor(public menu: MenuController) {}

  ngOnInit(): void {
    this.menu.enable(false);
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "page not found",
      page_path: "/pagenotfound",
    });
  }
}
