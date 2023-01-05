import { Component, OnInit } from '@angular/core';
import { PopoverController } from "@ionic/angular";
import { TodoService } from "../../services/todo.service";
@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {

  constructor(
    
    private popoverController: PopoverController,
    private todoService: TodoService, 
  ) {
   }

  ngOnInit() {
  }

  deleteAccount() {
    this.todoService.removeAccount().subscribe(
      (res) => {
        if (res["code"] === 200) {
          this.popoverController.dismiss(res);
        }
      },
      (err) => {
        //this.errorMessage = err.message;
        console.log(err);
      }
    );
  }

  closePopover() {
    this.popoverController.dismiss(false);
  }
}
