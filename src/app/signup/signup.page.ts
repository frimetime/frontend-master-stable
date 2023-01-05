import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { ImagePicker } from "@ionic-native/image-picker/ngx";

import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";

import { MenuController } from "@ionic/angular";
import { LoadingController, NavController } from "@ionic/angular";
import { CaptchaComponent } from "angular-captcha";

import { HttpClient } from "@angular/common/http";
import { UserService } from "../user/user.service";

import { Platform } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import * as firebase from "firebase/app";
import { FirebaseService } from "../services/firebase.service";
import { forEach } from "@angular-devkit/schematics";
import { environment } from "../../environments/environment";
import { CommonService } from '../services/common.service';
import { SocialUser } from 'ng4-social-login';
declare var gtag;
@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./styles/signup.page.scss"],
})
export class SignupPage implements OnInit {
  // this.validations_form out of ngOninit()!!!!!!!!!!!!!!!!!!!!!!

  validations_form: FormGroup;
  errorMessage = "";
  successMessage = "";
  imageResponse: any;
  options: any;
  countryData: any[];
  country: any;
  countrySelected: any;
  userName = "";
  userEmail: any;
  userPassword: any;
  cuserPassword: any;
  birthdate: any;
  role: any[];

  imageURL = "";
  private socialUserInfo: SocialUser;

  validation_messages = {
    firstname: [{ type: "required", message: "FirstName is required." }],
    lastname: [{ type: "required", message: "LastName is required." }],
    country: [{ type: "required", message: "Choose a country." }],
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Enter a valid email." },
    ],
    name: [{ type: "required", message: "Name is required." }],
    birthdate: [{ type: "required", message: "Date of birth is required." }],
    role: [{ type: "required", message: "Role is required." }],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 8 characters long.",
      },
    ],
    cpassword: [{ type: "required", message: "Confirm your password." }],
  };

  static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv["notChecked"] = true;
    }
    return rv;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  constructor(
    public authService: AuthService,
    public db: AngularFirestore, // new
    public formBuilder: FormBuilder,
    private router: Router,
    public platform: Platform,
    private imagePicker: ImagePicker,
    public menuCtrl: MenuController,
    private loadingController: LoadingController,
    public http: HttpClient,
    private firebaseService: FirebaseService,
    public alertController: AlertController,
    private commonService: CommonService
  ) {
    console.log(this.platform.platforms());

    if (this.commonService.socialUser) {
      this.socialUserInfo = this.commonService.socialUser;
      this.commonService.socialUser = null;
    }

    if (this.platform.is("ios")) {
      console.log("This is an ios device!");
    } else {
      console.log("This is not an android device!");
    }

    this.validations_form = this.formBuilder.group(
      {
        name: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.maxLength(23),
            Validators.pattern("^[a-zA-Z0-9_.+-]+"),
          ])
        ),
        country: new FormControl("", Validators.compose([Validators.required])),
        birthdate: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        role: new FormControl("", Validators.compose([Validators.required])),
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
            ),
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([Validators.minLength(8), Validators.required])
        ),
        cpassword: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        cbox: [false, SignupPage.mustBeTruthy],
      },
      {
        validators: this.checkPassword.bind(this),
      }
    );

    this.countryData = [
      {
        id: 1,
        name: "Afghanistan",
      },
      {
        id: 2,
        name: "Albania",
      },
      {
        id: 3,
        name: "Algeria",
      },
      {
        id: 4,
        name: "American Samoa",
      },
      {
        id: 5,
        name: "Andorra",
      },
      {
        id: 6,
        name: "Angola",
      },
      {
        id: 7,
        name: "Anguilla",
      },
      {
        id: 8,
        name: "Antarctica",
      },
      {
        id: 9,
        name: "Antigua and Barbuda",
      },
      {
        id: 10,
        name: "Argentina",
      },
      {
        id: 11,
        name: "Armenia",
      },
      {
        id: 12,
        name: "Aruba",
      },
      {
        id: 13,
        name: "Australia",
      },
      {
        id: 14,
        name: "Austria",
      },
      {
        id: 15,
        name: "Azerbaijan",
      },
      {
        id: 16,
        name: "Bahamas",
      },
      {
        id: 17,
        name: "Bahrain",
      },
      {
        id: 18,
        name: "Bangladesh",
      },
      {
        id: 19,
        name: "Barbados",
      },
      {
        id: 20,
        name: "Belarus",
      },
      {
        id: 21,
        name: "Belgium",
      },
      {
        id: 22,
        name: "Belize",
      },
      {
        id: 23,
        name: "Benin",
      },
      {
        id: 24,
        name: "Bermuda",
      },
      {
        id: 25,
        name: "Bhutan",
      },
      {
        id: 26,
        name: "Bolivia",
      },
      {
        id: 27,
        name: "Bosnia and Herzegovina",
      },
      {
        id: 28,
        name: "Botswana",
      },
      {
        id: 29,
        name: "Bouvet Island",
      },
      {
        id: 30,
        name: "Brazil",
      },
      {
        id: 31,
        name: "British Indian Ocean Territories",
      },
      {
        id: 32,
        name: "Brunei Darussalam",
      },
      {
        id: 33,
        name: "Bulgaria",
      },
      {
        id: 34,
        name: "Burkina Faso",
      },
      {
        id: 35,
        name: "Burundi",
      },
      {
        id: 36,
        name: "Cambodia",
      },
      {
        id: 37,
        name: "Cameroon",
      },
      {
        id: 38,
        name: "Canada",
      },
      {
        id: 39,
        name: "Cape Verde",
      },
      {
        id: 40,
        name: "Cayman Islands",
      },
      {
        id: 41,
        name: "Central African Republic",
      },
      {
        id: 42,
        name: "Chad",
      },
      {
        id: 43,
        name: "Chile",
      },
      {
        id: 44,
        name: "China, People's Republic of",
      },
      {
        id: 45,
        name: "Christmas Island",
      },
      {
        id: 46,
        name: "Cocos Islands",
      },
      {
        id: 47,
        name: "Colombia",
      },
      {
        id: 48,
        name: "Comoros",
      },
      {
        id: 49,
        name: "Congo",
      },
      {
        id: 50,
        name: "Cook Islands",
      },
      {
        id: 51,
        name: "Costa Rica",
      },
      {
        id: 52,
        name: "Cote D'ivoire",
      },
      {
        id: 53,
        name: "Croatia",
      },
      {
        id: 54,
        name: "Cuba",
      },
      {
        id: 55,
        name: "Cyprus",
      },
      {
        id: 56,
        name: "Czech Republic",
      },
      {
        id: 57,
        name: "Denmark",
      },
      {
        id: 58,
        name: "Djibouti",
      },
      {
        id: 59,
        name: "Dominica",
      },
      {
        id: 60,
        name: "Dominican Republic",
      },
      {
        id: 61,
        name: "East Timor",
      },
      {
        id: 62,
        name: "Ecuador",
      },
      {
        id: 63,
        name: "Egypt",
      },
      {
        id: 64,
        name: "El Salvador",
      },
      {
        id: 65,
        name: "Equatorial Guinea",
      },
      {
        id: 66,
        name: "Eritrea",
      },
      {
        id: 67,
        name: "Estonia",
      },
      {
        id: 68,
        name: "Ethiopia",
      },
      {
        id: 69,
        name: "Falkland Islands",
      },
      {
        id: 70,
        name: "Faroe Islands",
      },
      {
        id: 71,
        name: "Fiji",
      },
      {
        id: 72,
        name: "Finland",
      },
      {
        id: 73,
        name: "France",
      },
      {
        id: 74,
        name: "France, Metropolitan",
      },
      {
        id: 75,
        name: "French Guiana",
      },
      {
        id: 76,
        name: "French Polynesia",
      },
      {
        id: 77,
        name: "French Southern Territories",
      },
      {
        id: 78,
        name: "FYROM",
      },
      {
        id: 79,
        name: "Gabon",
      },
      {
        id: 80,
        name: "Gambia",
      },
      {
        id: 81,
        name: "Georgia",
      },
      {
        id: 82,
        name: "Germany",
      },
      {
        id: 83,
        name: "Ghana",
      },
      {
        id: 84,
        name: "Gibraltar",
      },
      {
        id: 85,
        name: "Greece",
      },
      {
        id: 86,
        name: "Greenland",
      },
      {
        id: 87,
        name: "Grenada",
      },
      {
        id: 88,
        name: "Guadeloupe",
      },
      {
        id: 89,
        name: "Guam",
      },
      {
        id: 90,
        name: "Guatemala",
      },
      {
        id: 91,
        name: "Guinea",
      },
      {
        id: 92,
        name: "Guinea-Bissau",
      },
      {
        id: 93,
        name: "Guyana",
      },
      {
        id: 94,
        name: "Haiti",
      },
      {
        id: 95,
        name: "Heard Island And Mcdonald Islands",
      },
      {
        id: 96,
        name: "Honduras",
      },
      {
        id: 97,
        name: "Hong Kong",
      },
      {
        id: 98,
        name: "Hungary",
      },
      {
        id: 99,
        name: "Iceland",
      },
      {
        id: 100,
        name: "India",
      },
      {
        id: 101,
        name: "Indonesia",
      },
      {
        id: 102,
        name: "Iran",
      },
      {
        id: 103,
        name: "Iraq",
      },
      {
        id: 104,
        name: "Ireland",
      },
      {
        id: 105,
        name: "Israel",
      },
      {
        id: 106,
        name: "Italy",
      },
      {
        id: 107,
        name: "Jamaica",
      },
      {
        id: 108,
        name: "Japan",
      },
      {
        id: 109,
        name: "Jordan",
      },
      {
        id: 110,
        name: "Kazakhstan",
      },
      {
        id: 111,
        name: "Kenya",
      },
      {
        id: 112,
        name: "Kiribati",
      },
      {
        id: 113,
        name: "North Korea",
      },
      {
        id: 114,
        name: "South Korea",
      },
      {
        id: 115,
        name: "Kuwait",
      },
      {
        id: 116,
        name: "Kyrgyzstan",
      },
      {
        id: 117,
        name: "Lao Peoples Democratic Republic",
      },
      {
        id: 118,
        name: "Latvia",
      },
      {
        id: 119,
        name: "Lebanon",
      },
      {
        id: 120,
        name: "Lesotho",
      },
      {
        id: 121,
        name: "Liberia",
      },
      {
        id: 122,
        name: "Libyan Arab Jamahiriya",
      },
      {
        id: 123,
        name: "Liechtenstein",
      },
      {
        id: 124,
        name: "Lithuania",
      },
      {
        id: 125,
        name: "Luxembourg",
      },
      {
        id: 126,
        name: "Macau",
      },
      {
        id: 127,
        name: "Madagascar",
      },
      {
        id: 128,
        name: "Malawi",
      },
      {
        id: 129,
        name: "Malaysia",
      },
      {
        id: 130,
        name: "Maldives",
      },
      {
        id: 131,
        name: "Mali",
      },
      {
        id: 132,
        name: "Malta",
      },
      {
        id: 133,
        name: "Marshall Islands",
      },
      {
        id: 134,
        name: "Martinique",
      },
      {
        id: 135,
        name: "Mauritania",
      },
      {
        id: 136,
        name: "Mauritius",
      },
      {
        id: 137,
        name: "Mayotte",
      },
      {
        id: 138,
        name: "Mexico",
      },
      {
        id: 139,
        name: "Micronesia",
      },
      {
        id: 140,
        name: "Moldova",
      },
      {
        id: 141,
        name: "Monaco",
      },
      {
        id: 142,
        name: "Mongolia",
      },
      {
        id: 143,
        name: "Montserrat",
      },
      {
        id: 144,
        name: "Morocco",
      },
      {
        id: 145,
        name: "Mozambique",
      },
      {
        id: 146,
        name: "Myanmar",
      },
      {
        id: 147,
        name: "Namibia",
      },
      {
        id: 148,
        name: "Nauru",
      },
      {
        id: 149,
        name: "Nepal",
      },
      {
        id: 150,
        name: "Netherlands",
      },
      {
        id: 151,
        name: "Netherlands Antilles",
      },
      {
        id: 152,
        name: "New Caledonia",
      },
      {
        id: 153,
        name: "New Zealand",
      },
      {
        id: 154,
        name: "Nicaragua",
      },
      {
        id: 155,
        name: "Niger",
      },
      {
        id: 156,
        name: "Nigeria",
      },
      {
        id: 157,
        name: "Niue",
      },
      {
        id: 158,
        name: "Norfolk Island",
      },
      {
        id: 159,
        name: "Northern Mariana Islands",
      },
      {
        id: 160,
        name: "Norway",
      },
      {
        id: 161,
        name: "Oman",
      },
      {
        id: 162,
        name: "Pakistan",
      },
      {
        id: 163,
        name: "Palau",
      },
      {
        id: 164,
        name: "Panama",
      },
      {
        id: 165,
        name: "Papua New Guinea",
      },
      {
        id: 166,
        name: "Paraguay",
      },
      {
        id: 167,
        name: "Peru",
      },
      {
        id: 168,
        name: "Philippines",
      },
      {
        id: 169,
        name: "Pitcairn",
      },
      {
        id: 170,
        name: "Poland",
      },
      {
        id: 171,
        name: "Portugal",
      },
      {
        id: 172,
        name: "Puerto Rico",
      },
      {
        id: 173,
        name: "Qatar",
      },
      {
        id: 174,
        name: "Reunion",
      },
      {
        id: 175,
        name: "Romania",
      },
      {
        id: 176,
        name: "Russian Federation",
      },
      {
        id: 177,
        name: "Rwanda",
      },
      {
        id: 178,
        name: "Saint Helena",
      },
      {
        id: 179,
        name: "Saint Kitts and Nevis",
      },
      {
        id: 180,
        name: "Saint Lucia",
      },
      {
        id: 181,
        name: "Saint Pierre and Miquelon",
      },
      {
        id: 182,
        name: "Saint Vincent and The Grenadines",
      },
      {
        id: 183,
        name: "Samoa",
      },
      {
        id: 184,
        name: "San Marino",
      },
      {
        id: 185,
        name: "Sao Tome and Principe",
      },
      {
        id: 186,
        name: "Saudi Arabia",
      },
      {
        id: 187,
        name: "Senegal",
      },
      {
        id: 188,
        name: "Seychelles",
      },
      {
        id: 189,
        name: "Sierra Leone",
      },
      {
        id: 190,
        name: "Singapore",
      },
      {
        id: 191,
        name: "Slovakia",
      },
      {
        id: 192,
        name: "Slovenia",
      },
      {
        id: 193,
        name: "Solomon Islands",
      },
      {
        id: 194,
        name: "Somalia",
      },
      {
        id: 195,
        name: "South Africa",
      },
      {
        id: 196,
        name: "South Georgia and Sandwich Islands",
      },
      {
        id: 197,
        name: "Spain",
      },
      {
        id: 198,
        name: "Sri Lanka",
      },
      {
        id: 199,
        name: "Sudan",
      },
      {
        id: 200,
        name: "Suriname",
      },
      {
        id: 201,
        name: "Svalbard and Jan Mayen",
      },
      {
        id: 202,
        name: "Swaziland",
      },
      {
        id: 203,
        name: "Sweden",
      },
      {
        id: 204,
        name: "Switzerland",
      },
      {
        id: 205,
        name: "Syrian Arab Republic",
      },
      {
        id: 206,
        name: "Taiwan",
      },
      {
        id: 207,
        name: "Tajikistan",
      },
      {
        id: 208,
        name: "Tanzania",
      },
      {
        id: 209,
        name: "Thailand",
      },
      {
        id: 210,
        name: "Togo",
      },
      {
        id: 211,
        name: "Tokelau",
      },
      {
        id: 212,
        name: "Tonga",
      },
      {
        id: 213,
        name: "Trinidad and Tobago",
      },
      {
        id: 214,
        name: "Tunisia",
      },
      {
        id: 215,
        name: "Turkey",
      },
      {
        id: 216,
        name: "Turkmenistan",
      },
      {
        id: 217,
        name: "Turks and Caicos Islands",
      },
      {
        id: 218,
        name: "Tuvalu",
      },
      {
        id: 219,
        name: "Uganda",
      },
      {
        id: 220,
        name: "Ukraine",
      },
      {
        id: 221,
        name: "United Arab Emirates",
      },
      {
        id: 222,
        name: "United Kingdom",
      },
      {
        id: 223,
        name: "United States",
      },
      {
        id: 224,
        name: "United States Minor Outlying Islands",
      },
      {
        id: 225,
        name: "Uruguay",
      },
      {
        id: 226,
        name: "Uzbekistan",
      },
      {
        id: 227,
        name: "Vanuatu",
      },
      {
        id: 228,
        name: "Vatican City State",
      },
      {
        id: 229,
        name: "Venezuela",
      },
      {
        id: 230,
        name: "Vietnam",
      },
      {
        id: 231,
        name: "Virgin Islands (British)",
      },
      {
        id: 232,
        name: "Virgin Islands (U.S.)",
      },
      {
        id: 233,
        name: "Wallis And Futuna Islands",
      },
      {
        id: 234,
        name: "Western Sahara",
      },
      {
        id: 235,
        name: "Yemen",
      },
      {
        id: 236,
        name: "Yugoslavia",
      },
      {
        id: 237,
        name: "Zaire",
      },
      {
        id: 238,
        name: "Zambia",
      },
      {
        id: 239,
        name: "Zimbabwe",
      },
    ];
  }
  ngOnInit() {
    this.validations_form.patchValue(this.socialUserInfo);
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "signup page",
      page_path: "/signup",
    });
  }

  // fileChanged(event) {

  //   const files = event.target.files

  //   const data = new FormData()
  //   data.append('file', files[0])
  //   data.append('UPLOADCARE_STORE', '1')
  //   data.append('UPLOADCARE_PUB_KEY', 'b87e74bd4737db691821')

  //   this.http.post('https://upload.uploadcare.com/base/', data)
  //   .subscribe(event =>{
  //     console.log(event)
  //     //this.imageURL = event.file
  //   })
  // }

  getImages() {
    this.platform.ready();
    if (this.platform.is("mobile")) {
      console.log("This is a mobile device!");
      this.options = {
        // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
        // selection of a single image, the plugin will return it.
        maximumImagesCount: 1,
        // max width and height to allow the images to be.  Will keep aspect
        // ratio no matter what.  So if both are 800, the returned image
        // will be at most 800 pixels wide and 800 pixels tall.  If the width is
        // 800 and height 0 the image will be 800 pixels wide if the source
        // is at least that wide.
        width: 200,
        // height: 200,
        // quality of resized image, defaults to 100
        quality: 25,
        // output type, defaults to FILE_URIs.
        // available options are
        // window.imagePicker.OutputType.FILE_URI (0) or
        // window.imagePicker.OutputType.BASE64_STRING (1)
        outputType: 1,
      };
      this.imageResponse = [];
      this.imagePicker.getPictures(this.options).then(
        (results) => {
          for (let i = 0; i < results.length; i++) {
            this.imageResponse.push("data:image/jpeg;base64," + results[i]);
          }
        },
        (err) => {
          alert(err);
        }
      );
    } else {
      console.log("This is not an android device!");
      // const alert = await this.alertController.create({
      //   header: "Alerta alerta",
      //   buttons: ["Cancel", "Go"]
      // });
      // await alert.present();
    }
  }

  checkPassword(formGroup: FormGroup) {
    const { value: userPassword } = formGroup.get("password");
    const { value: cuserPassword } = formGroup.get("cpassword");
    return userPassword === cuserPassword ? null : { passwordNotMatch: true };
  }

  // validations_form: FormGroup;
  //   errorMessage: string = '';
  //   successMessage: string = '';
  //   imageResponse: any;
  //   options: any;
  //   countryData : any[];
  //   country : any;
  //   countrySelected: any;
  //   userName: string = '';
  //   userEmail: any;
  //   userPassword: any;
  //   cuserPassword: any;
  //   birthdate: any;
  //   gender: any[];
  //   role: any[];

  goLoginPage() {
    this.router.navigate(["/auth/login"]);
  }

  goGettingStarted() {
    this.router.navigate(["/getting-started"]);
  }

  goPolicyPage() {
    this.router.navigate(["/policy"]);
  }

  // createTask(value){
  //   return new Promise<any>((resolve, reject) => {
  //     let currentUser = firebase.auth().currentUser;
  //     this.db.collection('users').doc(currentUser.uid).collection('credentials').add({
  //       name: value.name,
  //       country: value.country,
  //       image: value.image,
  //       role: value.role,
  //       birth: value.birth,
  //       email: value.email,
  //       pw: value.password
  //     })
  //     .then(
  //       res => resolve(res),
  //       err => reject(err)
  //     )
  //   })
  // }

  async tryRegister(value) {
    const {
      userName,
      userEmail,
      birthdate,
      role,
      country,
      userPassword,
      cuserPassword,
    } = this;
    const loading = await this.loadingController.create({
      message: "Creating account...",
    });
    await loading.present();
    // this.createTask(value)
    this.authService.doRegister(value).subscribe(
      (res) => {
        console.log(res);
        loading.dismiss();
        if (res["code"] === 200) {
          this.errorMessage = "";
          this.successMessage =
            "Account created! Check your email to get verified.";
          setTimeout(() => {
            loading.dismiss();
            this.router.navigate(["/auth/login"]);
          }, 5000);
        } else {
          loading.dismiss();
          const keys = Object.keys(res["error"]);
          for (const key of keys) {
            const item = res["error"][key];
            console.log(item);
            item.forEach((message) => (this.errorMessage += message + "\n"));
          }
          this.successMessage = "";
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
        this.errorMessage = err.message;
        this.successMessage = "";
      }
    );
  }
}
