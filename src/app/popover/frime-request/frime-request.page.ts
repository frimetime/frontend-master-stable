import { Component, OnInit } from "@angular/core";
import { NavParams, PopoverController } from "@ionic/angular";
import { TodoService } from "../../services/todo.service";
import { FrimeRequestSentPage } from "../frime-request-sent/frime-request-sent.page";
import { environment } from "../../../environments/environment";
import { FrimeFullPage } from "../frime-full/frime-full.page";
declare var gtag;
@Component({
  selector: "app-frime-request",
  templateUrl: "./frime-request.page.html",
  styleUrls: ["../popover.page.scss"],
})
export class FrimeRequestPage implements OnInit {
  frime_id = null;

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
      page_title: "frime request page",
      page_path: "/frimerequest",
    });
  }

  closePopover() {
    this.popoverController.dismiss(false);
  }

  sendFrimeRequest() {
    this.todoService.requestFriendtoFirme(this.frime_id).subscribe(
      async (res) => {
        this.popoverController.dismiss(res);
         if (res['code'] === 200) {
          this.popoverController.dismiss(true);
         
        } else if (res['code'] === 422) {
          this.popoverController.dismiss(true);
          // if(res["error"]["msg"] =='Maximum counter')
          // {
          //   const popover = await this.popoverController.create({
          //     component: FrimeFullPage,
          //     componentProps: {
          //       custom_id: "",
          //     },
          //   });
          // }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
