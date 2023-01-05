import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Location } from "@angular/common";
let ChatPage = class ChatPage {
    constructor(location) {
        this.location = location;
        this.messages = [
            {
                user: 'Gregor',
                createdAt: 1554090856000,
                msg: "Hey what's up? Are you excited to come to the movie nights at Oliver's?"
            },
            {
                user: 'Jasmine',
                createdAt: 1554090956000,
                msg: 'Yes totally!!! But first i have to do some work on FrimeTime again. And what are you up to right now?'
            },
            {
                user: 'Gregor',
                createdAt: 1554091056000,
                msg: "Cool! I'm doing some tutorial stuff"
            },
        ];
        this.currentUser = "Gregor";
        this.newMsg = '';
    }
    sendMessage() {
        this.messages.push({
            user: 'Jasmine',
            createdAt: new Date().getTime(),
            msg: this.newMsg
        });
        this.newMsg = '';
        setTimeout(() => {
            this.content.scrollToBottom(200);
        });
    }
    myBackButton() {
        this.location.back();
    }
};
tslib_1.__decorate([
    ViewChild(IonContent, { static: true }),
    tslib_1.__metadata("design:type", IonContent)
], ChatPage.prototype, "content", void 0);
ChatPage = tslib_1.__decorate([
    Component({
        selector: 'app-chat',
        templateUrl: './chat.page.html',
        styleUrls: ['./chat.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Location])
], ChatPage);
export { ChatPage };
//# sourceMappingURL=chat.page.js.map