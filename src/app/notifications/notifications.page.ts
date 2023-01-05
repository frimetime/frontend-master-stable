import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../environments/environment";
declare var gtag;
@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: [
    "./styles/notifications.page.scss",
    "./styles/notifications.shell.scss",
  ],
})
export class NotificationsPage implements OnInit {
  notifications: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route && this.route.data) {
      this.route.data.subscribe((resolvedData) => {
        const dataSource = resolvedData["data"];
        if (dataSource) {
          dataSource.source.subscribe((pageData) => {
            if (pageData) {
              this.notifications = pageData;
            }
          });
        }
      });
    }
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "notifications page",
      page_path: "/notifications",
    });
  }
}
