import { Directive, Input } from '@angular/core';

export interface ReCaptchaConfig {
  theme? : 'dark' | 'light';
  type? : 'audio' | 'image';
  size? : 'compact' | 'normal';
  tabindex? : number;
}

@Directive({
  selector: '[nbRecaptcha]'
})
export class RecaptchaDirective {
  @Input() key : string;
  @Input() config : ReCaptchaConfig = {};
  @Input() lang : string;
  
  constructor() { }

}
