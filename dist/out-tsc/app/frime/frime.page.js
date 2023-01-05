import * as tslib_1 from "tslib";
import { TodoService } from "../services/todo.service";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, NavController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FormBuilder, FormControl, Validators, } from "@angular/forms";
import { AngularFireMessaging } from "@angular/fire/messaging";
let FrimePage = class FrimePage {
    constructor(todoService, route, loadingController, nav, afAuth, fireStore, formBuilder, router, afMessaging) {
        this.todoService = todoService;
        this.route = route;
        this.loadingController = loadingController;
        this.nav = nav;
        this.afAuth = afAuth;
        this.fireStore = fireStore;
        this.formBuilder = formBuilder;
        this.router = router;
        this.afMessaging = afMessaging;
        this.errorMessage = "";
        this.validation_messages = {
            name: [{ type: "required", message: "Frime Name is required" }],
            description: [{ type: "required", message: "Description is required." }],
            startDate: [{ type: "required", message: "Start Date is required." }],
            startTime: [{ type: "required", message: "Start Time is required." }],
        };
        this.todoId = null;
        this.frime = {
            owner: "",
            title: "",
            message: "",
            date: "",
            time: "",
            guests: "",
        };
        // this.afAuth.authState.subscribe(user => {
        //   this.userId = user.uid;
        //   console.log('userID stored correct? ', this.userId);
        // });
        this.validations_form = this.formBuilder.group({
            title: new FormControl("", Validators.compose([Validators.required])),
            description: new FormControl("", Validators.compose([Validators.required])),
            startDate: new FormControl("", Validators.compose([Validators.required])),
            startTime: new FormControl("", Validators.compose([Validators.required])),
            guests: new FormControl("", Validators.compose([])),
        });
    }
    ngOnInit() {
        this.todoId = this.route.snapshot.params["id"];
        if (this.todoId) {
            this.loadTodo();
        }
        this.requestPushNotificationsPermission();
    }
    requestPushNotificationsPermission() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.afMessaging.requestToken.subscribe((token) => {
                console.log("Permission granted! Save to the server!", token);
            }, (error) => {
                console.error(error);
            });
        });
    }
    loadTodo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                message: "Loading Frimes...",
            });
            yield loading.present();
            this.todoService.getTodo(this.todoId).subscribe((res) => {
                loading.dismiss();
                this.frime = res;
            });
        });
    }
    saveTodo(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                message: "Saving your Frime...",
            });
            yield loading.present();
            if (this.todoId) {
                this.todoService.updateTodo(this.frime, this.todoId).then(() => {
                    loading.dismiss();
                    this.nav.navigateBack("app/frimelist");
                });
            }
            else {
                this.todoService.addTodo(value).subscribe((res) => {
                    loading.dismiss();
                    console.log(res);
                    if (res["code"] === "200") {
                        this.validations_form.reset();
                        this.nav.navigateBack("app/frimelist");
                    }
                    else {
                        if (typeof res["msg"] === "string") {
                            this.errorMessage = res["msg"];
                        }
                        else {
                            this.errorMessage = "Server error, please contact with support!";
                        }
                    }
                }, (err) => {
                    loading.dismiss();
                    this.validations_form.reset();
                    this.router.navigate(["auth/login"]);
                });
            }
        });
    }
};
FrimePage = tslib_1.__decorate([
    Component({
        selector: "app-frime",
        templateUrl: "./frime.page.html",
        styleUrls: ["./frime.page.scss"],
    }),
    tslib_1.__metadata("design:paramtypes", [TodoService,
        ActivatedRoute,
        LoadingController,
        NavController,
        AngularFireAuth,
        AngularFireStorageModule,
        FormBuilder,
        Router,
        AngularFireMessaging])
], FrimePage);
export { FrimePage };
//# sourceMappingURL=frime.page.js.map