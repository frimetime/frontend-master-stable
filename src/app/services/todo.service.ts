import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Todo {
    owner: string;
    title: string;
    message: string;
    date: string;
    time: string;
    guests: string;
}

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    token = '';
    urlSearchParams = new URLSearchParams();
    CREATE_FRIME_URL = 'https://frimetime.com/api/frime/create';
    GET_TODOS_URL = 'https://frimetime.com/api/frimes';
    GET_PROFILE_URL = 'https://frimetime.com/api/profile';
    REMOVE_FRIME_URL = 'https://frimetime.com/api/frime/cancel';
    REMOVE_ACCOUNT_URL = 'https://frimetime.com/api/delete_profile';
    LEAVE_FRIME_URL = 'https://frimetime.com/api/frime/leave';
    REQUEST_FRIEND_TO_FRIME_URL = 'https://frimetime.com/api/frime/enter';
    ACCEPT_FRIEND_TO_FRIME_URL = 'https://frimetime.com/api/frime/accept';
    GET_FRIME_INVITES_URL = 'https://frimetime.com/api/frime/invites';

    CREATE_COMMENTS_URL = 'https://frimetime.com/api/comment/create';
    GET_COMMENTS_URL = 'https://frimetime.com/api/comments';
    SEND_LIKE_TO_COMMENT_URL = 'https://frimetime.com/api/comment/like';
    SEND_REPLY_TO_COMMENT_URL = 'https://frimetime.com/api/comment/reply';
    DELETE_COMMENT_URL = 'https://frimetime.com/api/comment/delete';
    ACCEPT_FRIEND_INVITATION_URL = 'https://frimetime.com/api/friend/invite_accept';
    ACCEPT_FRIME_INVITATION_URL = 'https://frimetime.com/api/frime/accept';
    BLOCK_FRIEND_FROM_FRIME_URL = 'https://frimetime.com/api/frime/block';
    INVITE_FRIEND_TO_FRIME_URL = 'https://frimetime.com/api/frime/invite';
    GET_NOTIFICATION_URL = 'https://frimetime.com/api/push/notifications';

    private todosCollection: AngularFirestoreCollection<Todo>;

    private todos: Observable<Todo[]>;
    constructor(
        db: AngularFirestore,
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.token = authService.token;
        this.urlSearchParams.append('token', authService.token);
        this.todosCollection = db.collection<Todo>('todos');
        authService.refreshedtoken.subscribe((token) => {
            this.token = token;
            if (this.urlSearchParams.has('token')) { this.urlSearchParams.delete('token'); }
            this.urlSearchParams.append('token', this.token);
        });
        this.todos = this.todosCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    console.log(data, 'data in todo.service');
                    const id = ''; //a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }
    getNotifications() {
        return this.http.post(this.GET_NOTIFICATION_URL + '?' + this.urlSearchParams.toString(), null);
    }

    doGetProfile() {
        return this.http.post(this.GET_PROFILE_URL + '?' + this.urlSearchParams.toString(), null);
    }

    getTodos(keyword: string = '', frime_id: string = '', status: string = '') {
        // return this.todos;
        // console.log(this.todos, 'whats your value?');
        return this.http.post(this.GET_TODOS_URL + '?' + this.urlSearchParams.toString(), {
            keyword: keyword,
            frime_id: frime_id,
            status: status,
            friends: false,
        });
    }

    getGroupTodos(keyword: string = '', frime_id: string = '', status: string = '') {
        var apicall =
            this.http.post(this.GET_TODOS_URL + '?' + this.urlSearchParams.toString(), {
                //all:true,
                ownfrimes: true,
            });
        return apicall;
    }

    getFriendsTodos(isFriends: boolean = true) {
        // return this.todos;
        // console.log(this.todos, 'whats your value?');
        return this.http.post(this.GET_TODOS_URL + '?' + this.urlSearchParams.toString(), {
            friends: isFriends
        });
    }

    getFriendsTodosbytId(friend_id = '', isFriends: boolean = true) {
        // return this.todos;
        // console.log(this.todos, 'whats your value?');
        return this.http.post(this.GET_TODOS_URL + '?' + this.urlSearchParams.toString(), {
            friend_id: friend_id,
            friends: isFriends
        });
    }

    getActiveTodos(status: string) {
        //TODO load hosting or participating frimes of user 
        return this.http.post(this.GET_TODOS_URL + '?' + this.urlSearchParams.toString(), {
            status: status,
            friends: false
        });
    }

    getTodo(id) {
        // return this.todosCollection.doc<Todo>(id).valueChanges();
        return this.http.post(this.GET_TODOS_URL + '?' + this.urlSearchParams.toString(), {
            frime_id: id
        });
    }

    updateTodo(todo: Todo, id: string) {
        return this.todosCollection.doc(id).update(todo);
    }

    addTodo(value) {
        return this.http.post(this.CREATE_FRIME_URL + '?' + this.urlSearchParams.toString(), {
            title: value.title,
            description: value.description,
            startTime: value.startTime,
            startDate: value.startDate,
            max: value.guests
        });
    }

    removeTodo(id) {
        return this.http.post(this.REMOVE_FRIME_URL + '?' + this.urlSearchParams.toString(), {
            frime_id: id
        });
    }
    removeAccount() {
        return this.http.post(this.REMOVE_ACCOUNT_URL + '?' + this.urlSearchParams.toString(), {
        });
    }
    leaveFrime(id)
    {
        return this.http.post(this.LEAVE_FRIME_URL + '?' + this.urlSearchParams.toString(), {
            frime_id: id
        });
    }
    acceptFriendtoFirme(request_id: string) {
        return this.http.post(this.ACCEPT_FRIEND_TO_FRIME_URL + '?' + this.urlSearchParams.toString(), {
            request_id: request_id,
            agree: "yes",
        });
    }
    rejectFriendtoFirme(request_id: string) {
        return this.http.post(this.ACCEPT_FRIEND_TO_FRIME_URL + '?' + this.urlSearchParams.toString(), {
            request_id: request_id,
            agree: "no",
        });
    }
    requestFriendtoFirme(frime_id: string) {
        return this.http.post(this.REQUEST_FRIEND_TO_FRIME_URL + '?' + this.urlSearchParams.toString(), {
            frime_id: frime_id
        });
    }

    getOwnInvitesAsGuest() {
        return this.http.post(this.GET_FRIME_INVITES_URL + '?' + this.urlSearchParams.toString(), {});
    }

    getInvitesForOwnFrime(frime_id: string) {
        return this.http.post(this.GET_FRIME_INVITES_URL + '?' + this.urlSearchParams.toString(), {
            frime_id: frime_id
        });
    }

    createComment(frime_id: string, content: string, parent_id: string) {
        return this.http.post(this.CREATE_COMMENTS_URL + '?' + this.urlSearchParams.toString(), {
            frime_id: frime_id,
            content: content,
            parent_id: parent_id,
        });
    }

    getComments(frime_id: string) {
        return this.http.post(this.GET_COMMENTS_URL + '?' + this.urlSearchParams.toString(), {
            frime_id: frime_id
        });
    }

    sendLiketoComment(comment_id: string) {
        return this.http.post(this.SEND_LIKE_TO_COMMENT_URL + '?' + this.urlSearchParams.toString(), {
            comment_id: comment_id
        });
    }

    sendDisLiketoComment(comment_id: string) {
        return this.http.post(this.SEND_REPLY_TO_COMMENT_URL + '?' + this.urlSearchParams.toString(), {
            comment_id: comment_id
        });
    }

    sendReplytoComment(comment_id: string, content: string) {
        return this.http.post(this.SEND_REPLY_TO_COMMENT_URL + '?' + this.urlSearchParams.toString(), {
            comment_id: comment_id,
            content: content
        });
    }

    // DELETE_COMME
    deleteComment(comment_id: string) {
        return this.http.post(this.DELETE_COMMENT_URL + '?' + this.urlSearchParams.toString(), {
            comment_id: comment_id
        });
    }

    get12HourFormatTime(time: string): string {
        // format: 16:36:16
        let retVal = '';
        // let hours = Number(time.substr(0, 2));
        // const mins = Number(time.substr(3, 2));
        // const secs = Number(time.substr(5, 2));
        //"9:38:19 PM"
        // retVal = date.toLocaleTimeString();
        // retVal = new Date(date.toLocaleDateString() + " " + hours + ":" + mins + ":00.000000Z").toLocaleTimeString();
        // retVal = retVal.substr()
        // console.log(date.toString());
        // const amOrpm = hours > 12 ? 'pm' : 'am';

        // hours = hours % 12;
        // hours = hours == 0 ? 12 : hours;

        // retVal = hours + ':' + mins + ' ' + amOrpm;
        const date = new Date(time + ".000000Z");
        retVal = date.toLocaleTimeString();
        retVal = retVal.substr(0, retVal.lastIndexOf(':')) + ' ' + retVal.substr(retVal.length - 2);
        return retVal;
    }

    acceptFriendInvitation(invite_id: string, accept: string) {
        return this.http.post(this.ACCEPT_FRIEND_INVITATION_URL + '?' + this.urlSearchParams.toString(), {
            invite_id: invite_id.toString(),
            accept: accept
        });
    }

    acceptFrimeInvitation(request_id: string, agree: string) {
        return this.http.post(this.ACCEPT_FRIME_INVITATION_URL + '?' + this.urlSearchParams.toString(), {
            request_id: request_id,
            agree: agree
        });
    }

    blockFriendFromFrime(frime_id: string, friend_id: string) {
        return this.http.post(this.BLOCK_FRIEND_FROM_FRIME_URL + '?' + this.urlSearchParams.toString(), {
            frime_id: frime_id,
            friend_id: friend_id
        });
    }

    inviteFriendToFrime(frime_id: string, friend_id: string) {
        return this.http.post(this.INVITE_FRIEND_TO_FRIME_URL + '?' + this.urlSearchParams.toString(), {
            frime_id: frime_id,
            friend_id: friend_id
        });
    }

    isFrimeExpired(createdUTCDate): boolean {
        let isExpire: boolean = false;
        const createdDate = new Date(createdUTCDate);
        const currentDate = new Date();
        let diff = (currentDate.getTime() - createdDate.getTime()) / 1000;
        diff = diff / (60 * 60);
        if (diff > 24) {
            isExpire = true;
        }

        return isExpire;
    }
}
