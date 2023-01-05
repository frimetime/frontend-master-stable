import * as tslib_1 from "tslib";
import { TodoService } from '../services/todo.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
let FrimelistPage = class FrimelistPage {
    constructor(todoService, route, afAuth, nav, popoverController) {
        this.todoService = todoService;
        this.route = route;
        this.afAuth = afAuth;
        this.nav = nav;
        this.popoverController = popoverController;
        this.value = 0;
        this.afAuth.authState.subscribe(user => {
            this.userId = user.uid;
            console.log('userID stored correct? ', this.userId);
        });
    }
    ngOnInit() {
        this.todoService.getTodos().subscribe(res => {
            this.todos = res;
            console.log(this.todos, 'this value i need?');
            /* loading all events, now seperating it by invited/part of, new frimes (maybe joinable etc)*/
        });
        if (this.route && this.route.data) {
            this.route.data.subscribe(resolvedData => {
                const dataSource = resolvedData['data'];
                if (dataSource) {
                    dataSource.source.subscribe(pageData => {
                        if (pageData) {
                            this.notifications = pageData;
                        }
                    });
                }
            });
        }
    }
    remove(item) {
        this.todoService.removeTodo(item.id);
    }
    openPopover() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const popover = yield this.popoverController.create({
                component: PopoverPage,
                componentProps: {
                    custom_id: this.value
                },
            });
            popover.present();
        });
    }
};
FrimelistPage = tslib_1.__decorate([
    Component({
        selector: 'app-frimelist',
        templateUrl: './frimelist.page.html',
        styleUrls: ['./frimelist.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TodoService,
        ActivatedRoute,
        AngularFireAuth,
        NavController,
        PopoverController])
], FrimelistPage);
export { FrimelistPage };
//# sourceMappingURL=frimelist.page.js.map