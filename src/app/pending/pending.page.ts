import { Component, OnInit } from '@angular/core';
import { LoadingController, NavParams, PopoverController } from "@ionic/angular";
import { VerifyRequestPage } from "../verify-request/verify-request.page";

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {



  constructor(
    private popoverController: PopoverController,
    private loadingController: LoadingController,) { }

  ngOnInit() {
  }

  async openVerifyPopup() {
    const popover = await this.popoverController.create({
      component: VerifyRequestPage,
    });
    
  await popover.present();

  }
  

}
