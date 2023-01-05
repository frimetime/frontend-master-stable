import * as tslib_1 from "tslib";
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
let TodoService = class TodoService {
    constructor(db, http, authService) {
        this.http = http;
        this.authService = authService;
        this.token = '';
        this.urlSearchParams = new URLSearchParams();
        this.CREATE_FRIME_URL = 'https://frimetime.eu/api/frime/create';
        this.token = authService.token;
        this.urlSearchParams.append('token', authService.token);
        this.todosCollection = db.collection('todos');
        this.todos = this.todosCollection.snapshotChanges().pipe(map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                console.log(data, 'data in todo.service');
                const id = a.payload.doc.id;
                return Object.assign({ id }, data);
            });
        }));
    }
    getTodos() {
        return this.todos;
        console.log(this.todos, 'whats your value?');
    }
    getTodo(id) {
        return this.todosCollection.doc(id).valueChanges();
    }
    updateTodo(todo, id) {
        return this.todosCollection.doc(id).update(todo);
    }
    addTodo(value) {
        return this.http.post(this.CREATE_FRIME_URL + '?' + this.urlSearchParams.toString(), {
            title: value.title,
            description: value.description,
            startTime: value.startDate,
            startDate: value.startTime,
            max: value.guests
        });
    }
    removeTodo(id) {
        return this.todosCollection.doc(id).delete();
    }
};
TodoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AngularFirestore,
        HttpClient,
        AuthService])
], TodoService);
export { TodoService };
//# sourceMappingURL=todo.service.js.map