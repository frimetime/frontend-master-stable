import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
 
@Component({
  selector: 'app-signup-captcha',
  templateUrl: './signup-captcha.component.html',
  styleUrls: ['./signup-captcha.component.scss'],
})
export class SignupCaptchaComponent implements OnInit {
 
  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
 
  constructor() { }
 
  ngOnInit() {
    this.addRecaptchaScript();
  }
 
  renderReCaptch() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6LeNWMQUAAAAABoMJoh6jhP53Zyzykbt8dNUT_qt', //geheimschlüssel 6LeNWMQUAAAAAO7kSrLbUStTi0Qvv3MboRaUmB6U
      'callback': (response) => {
          console.log(response);
      }
    });
  }
 
  addRecaptchaScript() {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }
 
}




