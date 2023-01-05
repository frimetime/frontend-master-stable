import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from "@ionic/angular";

@Component({
  selector: 'app-frime-full',
  templateUrl: './frime-full.page.html',
  styleUrls: ["../popover.page.scss"],
})
export class FrimeFullPage implements OnInit {

  constructor(
    private popoverController: PopoverController,  private navParams: NavParams,) { }

  ngOnInit() {

  }
  
  closePopover() {
    this.popoverController.dismiss();
  }

}
