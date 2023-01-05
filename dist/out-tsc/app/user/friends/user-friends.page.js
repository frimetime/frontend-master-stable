import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
let UserFriendsPage = class UserFriendsPage {
    constructor(route, location, user) {
        this.route = route;
        this.location = location;
        this.user = user;
        this.segmentValue = 'friends';
        this.searchQuery = '';
        this.showFilters = false;
    }
    get isShell() {
        // return (this.data && this.data.isShell) ? true : false;
        return false;
    }
    ngOnInit() {
        this.followersList = [];
        this.followingList = [];
        this.friendsList = this.route.snapshot.data['data']['data'];
    }
    segmentChanged(ev) {
        this.segmentValue = ev.detail.value;
        // Check if there's any filter and apply it
        this.searchList();
    }
    searchList() {
        const query = (this.searchQuery && this.searchQuery !== null) ? this.searchQuery : '';
        // if (this.segmentValue === 'friends') {
        //     //   this.friendsList = this.filterList(this.data.friends, query);
        //     // }
        // else if (this.segmentValue === 'followers') {
        //   this.followersList = this.filterList(this.data.followers, query);
        // } else if (this.segmentValue === 'following') {
        //   this.followingList = this.filterList(this.data.following, query);
        // }
    }
    filterList(list, query) {
        return list.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }
    myBackButton() {
        this.location.back();
    }
};
tslib_1.__decorate([
    HostBinding('class.is-shell'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], UserFriendsPage.prototype, "isShell", null);
UserFriendsPage = tslib_1.__decorate([
    Component({
        selector: 'app-user-friends',
        templateUrl: './user-friends.page.html',
        styleUrls: [
            './styles/user-friends.page.scss',
            './styles/user-friends.shell.scss',
            './styles/user-friends.md.scss'
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        Location,
        UserService])
], UserFriendsPage);
export { UserFriendsPage };
//# sourceMappingURL=user-friends.page.js.map