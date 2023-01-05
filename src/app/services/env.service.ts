import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  API_URL = 'https://frimetime.com/api/register';
  LOGIN_URL = 'https://frimetime.com/api/login';
  RECOVER_PASS_URL = 'https://frimetime.com/api/forget';
  VERIFYEMAIL_URL = 'https://frimetime.com/api/verify';
  REGISTER_SOCIAL_USER_URL = 'https://frimetime.com/api/register/social';
  LOGIN_SOCIAL_USER_URL = 'https://frimetime.com/api/login/social';
  REGISTER_DEVICE_KEY = 'https://frimetime.com/api/push/register';
  constructor() { }
}
