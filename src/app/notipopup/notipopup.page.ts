import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-notipopup',
  templateUrl: './notipopup.page.html',
  styleUrls: ['./notipopup.page.scss'],
})
export class NotipopupPage implements OnInit {

  constructor(private navParams: NavParams,
    private popoverController: PopoverController) { }

  ngOnInit() {
  }

  closePopover() {
    this.popoverController.dismiss();
  }
 

}
