import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.page.html',
  styleUrls: ['./friend-detail.page.scss'],
})
export class FriendDetailPage implements OnInit {
  profile:any;
  image:string;
  username:string;
  description:string;

  constructor( private location: Location, private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.image) {
        this.image = params.image;
        this.username = params.username;
        this.description = params.description;
      }
    });
  
  }

  ngOnInit() {
  }
  myBackButton() {
    this.router.navigate(["app/user/friends"]);
  }
}
