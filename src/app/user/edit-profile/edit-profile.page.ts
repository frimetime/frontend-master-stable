import { Component, OnInit } from "@angular/core";
import { LoadingController, NavParams } from "@ionic/angular";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
declare var gtag;
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  fieldType = "";
  fieldValue = "";
  fieldName = "";
  validations_form: FormGroup;
  errorMessage = "";
  successMessage = "";

  constructor(
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router,
    private user: UserService
  ) {
    this.validations_form = this.formBuilder.group({
      username: new FormControl("", Validators.compose([Validators.required])),
      firstname: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    this.fieldName = this.navParams.get("fieldName");
    this.fieldType = this.navParams.get("fieldType");
    this.fieldValue = this.navParams.get("fieldValue");
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "edit profile page",
      page_path: "/editprofile",
    });
  }
  async tryUpdateProfile(value) {
    const loading = await this.loadingController.create({
      message: "Updating...",
    });
    await loading.present();
    if (this.fieldName === "username") {
      if (value.username === "") {
        await loading.dismiss();
        this.errorMessage = "Username is required!";
      }
      this.user.doUpdateUserName(value).subscribe(
        (res) => {
          console.log(res);
          loading.dismiss();
          if (res["code"] === 200) {
            this.errorMessage = "";
            this.successMessage = "Success!";
            this.user.profile.username = value.username;
          } else {
            this.errorMessage = res["msg"];
            this.successMessage = "";
          }
        },
        (err) => {
          loading.dismiss();
          this.errorMessage = err;
          this.successMessage = "";
        }
      );
    } else if (this.fieldName === "status") {
      if (value.status === "") {
        await loading.dismiss();
        this.errorMessage = "Status is required!";
      }
      this.user.doUpdateStatus(value).subscribe(
        (res) => {
          console.log(res);
          loading.dismiss();
          if (res["code"] === 200) {
            this.errorMessage = "";
            this.successMessage = "Success!";
            this.user.profile.description = value.status;
          } else {
            this.errorMessage = res["msg"];
            this.successMessage = "";
          }
        },
        (err) => {
          loading.dismiss();
          this.errorMessage = err;
          this.successMessage = "";
        }
      );
    }
  }
}
