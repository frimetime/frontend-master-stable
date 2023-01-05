import { Injectable } from '@angular/core';
import { SocialUser } from 'ng4-social-login';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    public selected_frime: any;
    public current_user: any;
    public isFriendFrime: boolean;
    public otherFrimeUser: any;
    public socialUser: SocialUser;
    constructor() { }
}