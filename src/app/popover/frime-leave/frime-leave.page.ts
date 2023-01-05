import { Component, OnInit } from "@angular/core";
import { NavParams, PopoverController } from "@ionic/angular";
import { environment } from "../../../environments/environment";
import { TodoService } from "../../services/todo.service";
declare var gtag;
@Component({
  selector: "app-frime-leave",
  templateUrl: "./frime-leave.page.html",
  styleUrls: ["../popover.page.scss"],
})
export class FrimeLeavePage implements OnInit {
  frime_id;
  constructor(
    private navParams: NavParams,
    private todoService: TodoService,
    private popoverController: PopoverController
  ) {
    this.frime_id = this.navParams.get("frime_id");
  }

  ngOnInit() {
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "frime leave page",
      page_path: "/frimeleave",
    });
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  leaveFrime() {
    this.todoService.leaveFrime(this.frime_id).subscribe(
      (res) => {
        if (res["code"] === 200) {
          this.popoverController.dismiss(res);
          //Alert frime canceled successfully
        }
      },
      (err) => {
        //this.errorMessage = err.message;
        console.log(err);
      }
    );
  }
}
