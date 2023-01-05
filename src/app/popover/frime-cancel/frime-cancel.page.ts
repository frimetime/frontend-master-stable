import { Component, OnInit } from "@angular/core";
import { NavParams, PopoverController } from "@ionic/angular";
import { TodoService } from "../../services/todo.service";
import { environment } from "../../../environments/environment";
declare var gtag;
@Component({
  selector: "app-frime-cancel",
  templateUrl: "./frime-cancel.page.html",
  styleUrls: ["../popover.page.scss"],
})
export class FrimeCancelPage implements OnInit {
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
      page_title: "frime cancel page",
      page_path: "/frimecancel",
    });
  }

  closePopover() {
    this.popoverController.dismiss(false);
  }

  cancelFrime() {
    this.todoService.removeTodo(this.frime_id).subscribe(
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
