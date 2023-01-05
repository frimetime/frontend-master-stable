import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupCaptchaComponent } from './signup-captcha.component';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule,],
  declarations: [SignupCaptchaComponent],
  exports: [SignupCaptchaComponent]
})
export class SignupCaptchaComponentModule {}
