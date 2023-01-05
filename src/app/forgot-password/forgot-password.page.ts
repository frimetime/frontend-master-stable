import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { LoadingController } from "@ionic/angular";
import { environment } from "../../environments/environment";
declare var gtag;
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./styles/forgot-password.page.scss"],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  errorMessage = "";
  successMessage = "";

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Enter a valid email." },
    ],
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    private authService: AuthService,
    public loadingController: LoadingController
  ) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(
        "test@test.com",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "forgot password page",
      page_path: "/forgotpassword",
    });
  }

  async recoverPassword(value) {
    console.log(this.forgotPasswordForm.value);
    const loading = await this.loadingController.create({
      message: "Recover Password...",
    });
    await loading.present();
    this.authService.doRecoverPassword(value).subscribe(
      (res) => {
        loading.dismiss();
        console.log(res);
        if (res["code"] === 200) {
          this.successMessage = res["msg"];
          this.errorMessage = "";
          this.router.navigate(["/auth/login"]);
        } else {
          this.successMessage = "";
          this.errorMessage = res["msg"];
        }
      },
      (err) => {
        loading.dismiss();
        this.errorMessage = err;
        this.successMessage = "";
        console.log(err);
      }
    );
  }
}
