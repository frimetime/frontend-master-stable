import {
  LoadingController,
  NavParams,
  PopoverController,
} from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { any } from "codelyzer/util/function";
import { environment } from "../../environments/environment";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
declare var gtag;

@Component({
  selector: "app-verify-request",
  templateUrl: "./verify-request.page.html",
  styleUrls: ["./verify-request.page.scss"],
})
export class VerifyRequestPage implements OnInit {
  user = any;
  errorMessage = "";
  successMessage = "";
  email="";
  validations_form: FormGroup;

  validation_messages = {
    email: [{ type: "required", message: "email is required" }],
  };
  constructor(
    private router: Router,
    private navParams: NavParams,
    private popoverController: PopoverController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.navParams.get("user");
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "verify request page",
      page_path: "/verifyrequest",
    });
  }

  async tryVerifyEmail() {
    const loading = await this.loadingController.create({
      message: "Sending...",
    });
    await loading.present();
    this.authService.doVerifyEmail(this.email).subscribe(
      (res) => {
        console.log(res);
        loading.dismiss();
        if (res["code"] === 200) {
          this.successMessage = res["msg"];
          setTimeout(() => {
            this.router.navigate(["/auth/login"]);
          }, 5000);
        } else {
          this.errorMessage = res["msg"];
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
        this.errorMessage = err;
      }
    );
  }
}
