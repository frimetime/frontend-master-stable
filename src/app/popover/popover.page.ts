import { NavParams, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  passedId = null;

  constructor(private navParams: NavParams,
    private todoService: TodoService,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  sendRequest() {
   
  }

  pendingRequest() { }

}
