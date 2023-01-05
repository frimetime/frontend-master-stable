import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { IonContent, LoadingController, NavController, PopoverController, } from "@ionic/angular";
import { Location } from "@angular/common";
import { CommonService } from '../services/common.service';
import { TodoService } from '../services/todo.service';
import { UserService } from '../user/user.service';
import { environment } from "../../environments/environment";
import { FrimeCancelPage } from "../popover/frime-cancel/frime-cancel.page";
import { Router } from '@angular/router';
import { MessageModel } from './message.model';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { FrimeLeavePage } from "../popover/frime-leave/frime-leave.page";
declare var gtag;
@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  todos: any[];

  // messages = [{
  //   user: 'hubcode4',
  //   createdAt: new Date().getTime(),
  //   msg: "first user's own comment",
  //   id: 1
  // }, {
  //   user: 'friend 1',
  //   createdAt: new Date().getTime(),
  //   msg: "friend1's comment",
  //   id: 2
  // }, {
  //   user: "hubcode4",
  //   createdAt: new Date().getTime(),
  //   msg: "user's own comments",
  //   id: 3
  // }];
  messages = [] as MessageModel[];
  messageReply = [] as MessageModel[];
  // replys = [];
  currentUser = "";
  newMsg = "";
  @ViewChild(IonContent, { static: true }) content: IonContent;
  public frime_id: string;
  public parent_id: number = 0;
  public user: any = {};
  public todo: any = {};
  private userDataList: any[];
  userId: string;
  comments: MessageModel[];
  commentsreply: MessageModel[];
  isFriendFrime: boolean;

  constructor(
    private commonservice: CommonService,
    private location: Location,
    private loadingController: LoadingController,
    private popoverController: PopoverController,
    private nav: NavController,
    private todoService: TodoService,
    private router: Router,
    private userservice: UserService,
    private authService: AuthService
  ) {

    if (this.commonservice.selected_frime == null || this.commonservice.selected_frime.frime_id == null) {
      this.location.back();
    }
    // debugger;

    this.todo = this.commonservice.selected_frime;
    this.user = this.commonservice.isFriendFrime ? this.commonservice.otherFrimeUser : this.commonservice.current_user;
    if(this.todo.image == 'undefined' || this.todo.image ==null || this.todo.image=="" )
    {
      if(this.todo.userimage== 'undefined' || this.todo.userimage== null || this.todo.userimage== "" )
      {
        this.todo.image = this.user.image;
      }
      else
      this.todo.image = this.todo.userimage;
    }
    this.frime_id = this.todo.frime_id;
    this.parent_id = this.todo.comment_id == undefined ? 0 : this.todo.comment_id;
    var username ='';
    if( this.todo.name != null)
    {
    username=this.todo.name;
    }
    else
    {
    username=this.todo.owner;
    }
    this.user.name = username + "'s Frimes";
    this.currentUser = this.todo.name;
    this.userId = this.user.id ? this.user.id : this.todo.user_id;
   if(this.todo.owner == this.user.username)
   {
    this.isFriendFrime = false;
   }
   else{
    this.isFriendFrime = true;
   }
  }

  ngOnInit() {
    //Google analytics
    gtag("config", environment.firebase.trackerID, {
      page_title: "chat page",
      page_path: "/chat",
    });
    this.getFrimersList();
  }

  async getFrimersList() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.userservice.doGetUserList().subscribe(res => {
      console.log(res);
      if (res['code'] === 200) {
        loading.dismiss();
        this.userDataList = res['data'];
        this.getComments();
      } else {
        loading.dismiss();
      }
    }, async err => {
      loading.dismiss();
      console.log(err);
      // const response = await this.authService.refreshToken().toPromise<any>();
      // if ((err.status == 401 || err.statusText == 'Unauthorized')) {
      //   // this.navigationSubscription.unsubscribe();
      //   this.authService.isLoggedIn = new BehaviorSubject(false);
      //   this.authService.doLogout();
      //   this.router.navigate(["auth/login"]);
      // }
    });
  }

  async getComments() {
    // const loading = await this.loadingController.create({
    //   message: "Loading...",
    // });
    //await loading.present();
    this.todoService.getComments(this.frime_id).subscribe(
      (res) => {
        console.log(res);
        if (res["code"] === 200) {
          this.comments = res['data'];
          this.messages = [];
          this.comments.sort(function (a, b) { return a.id - b.id })
            .forEach(comment => {
              let user = this.userDataList.find(usr => usr.id == comment.guest_id);
              if (comment.parent_id > 0) { 
                // this.messageReply.push({
                //   content: comment.content,
                //   created_at: new Date(comment.created_at),
                //   frime_id: comment.frime_id,
                //   guest_id: comment.guest_id,
                //   id: comment.id,
                //   likes: this.getLikes(comment.likes),
                //   status: comment.status,
                //   updated_at: new Date(comment.updated_at),
                //   user: user.username,
                //   userimage: user.image,
                //   parent_id: comment.parent_id,
                //   replies: this.getReplies(comment.id, res['data'], user)
                // });
              }
              this.messages.push({
                content: comment.content,
                created_at: new Date(comment.created_at),
                frime_id: comment.frime_id,
                guest_id: comment.guest_id,
                id: comment.id,
                likes: this.getLikes(comment.likes),
                status: comment.status,
                updated_at: new Date(comment.updated_at),
                user: user.username,
                userimage: user.image,
                parent_id: comment.parent_id,
                isleft: comment.isleft,
                replies: comment.replies // this.getReplies(comment.id, res['data'], user)
              });
            });
        }

        //loading.dismiss();
      },
      (err) => {
        //loading.dismiss();
        console.log(err);
      }
    );
  }

  getLikes(likes: string[]) {
    if (likes.filter(like => like == '' || like == '0' || like == '-1').length == likes.length) {
      return [] as string[];
    }

    return likes;
  }

  getReplies(comment_id: number, comments: any[], user: any): MessageModel[] {
    const replyData: MessageModel[] = [];
    const commentReplies = comments.filter(c => c.parent_id == comment_id);
    if (commentReplies == null || commentReplies.length == 0) {
      return replyData;
    }

    commentReplies.forEach((reply) => {
      replyData.push({
        content: reply.content,
        created_at: new Date(reply.created_at),
        frime_id: reply.frime_id,
        guest_id: reply.guest_id,
        id: reply.id,
        likes: this.getLikes(reply.likes),
        status: reply.status,
        updated_at: new Date(reply.updated_at),
        user: user.username,
        userimage: user.image,
        parent_id: comment_id,
        isleft:reply.isleft,
        replies: [] as MessageModel[]
      })
    });


    return replyData;
  }

  sendMessage() {
    this.todoService.createComment(this.frime_id, this.newMsg, this.parent_id.toString())
      .subscribe(res => {
        console.log(res);
        if (res["code"] === 200) {
          this.getComments();
          // this.messages.push({
          //   content: this.newMsg,
          //   created_at: new Date(),
          //   frime_id: this.frime_id,
          //   guest_id: this.userId,
          //   id: -1,
          //   likes: [],
          //   status: "0",
          //   updated_at: new Date(),
          //   user: this.currentUser,
          //   userimage: this.user.image
          // });

          this.newMsg = "";

          setTimeout(() => {
            this.content.scrollToBottom(200);
          });
        } else {
        }
      },
        (err) => {
          console.log(err);
        }
      );
  }

  sendLiketoComment(comment_reply: MessageModel) {
    if (!comment_reply) {
      return;
    }

    if (comment_reply.likes.findIndex(like => like == this.userId.toString()) > -1) {
      this.sendDisLiketoComment(comment_reply);
      return;
    }

    this.todoService.sendLiketoComment(comment_reply.id.toString())
      .subscribe((res) => {
        console.log(res);
        if (res['code'] === 200) {
          let commentIndex: number = this.messages.findIndex(c => c.id == comment_reply.id);
          if (comment_reply.parent_id > 0) {
            commentIndex = this.messages.findIndex(c => c.id == comment_reply.parent_id);
            const replyIndex = this.messages[commentIndex].replies.findIndex(r => r.id == comment_reply.id);
            if (replyIndex > -1) {
              this.messages[commentIndex].replies[replyIndex].likes.push(comment_reply.guest_id.toString());
            }
          } else {
            this.messages[commentIndex].likes.push(comment_reply.guest_id.toString());
          }
        }
      },
        (err) => {
          console.log(err);
        }
      );
  }

  sendDisLiketoComment(comment_reply: MessageModel) {
    if (!comment_reply) {
      return;
    }

    this.todoService.sendDisLiketoComment(comment_reply.id.toString())
      .subscribe((res) => {
        console.log(res);
        if (res['code'] === 200) {
          let commentIndex: number = this.messages.findIndex(c => c.id == comment_reply.id);
          if (comment_reply.parent_id > 0) {
            commentIndex = this.messages.findIndex(c => c.id == comment_reply.parent_id);
            const replyIndex = this.messages[commentIndex].replies.findIndex(r => r.id == comment_reply.id);
            if (replyIndex > -1) {
              const likeIndex = this.messages[commentIndex].replies[replyIndex].likes.findIndex(like => like == this.userId.toString());
              this.messages[commentIndex].replies[replyIndex].likes.splice(likeIndex, 1);
            }
          } else {
            const likeIndex = this.messages[commentIndex].likes.findIndex(like => like == this.userId.toString());
            this.messages[commentIndex].likes.splice(likeIndex, 1);
          }

          // setTimeout(() => {
          //   this.content.scrollToBottom(200);
          // });
        }
      },
        (err) => {
          console.log(err);
        }
      );
  }

  sendReplytoComment(comment_id: string, content: string) {
    if (!comment_id || !content) {
      return;
    }
    this.todoService.createComment(this.frime_id, this.newMsg, comment_id)
      .subscribe(res => {
        debugger;
        console.log(res);
        if (res["code"] === 200) {
          const comment_index = this.messages.findIndex(c => c.id.toString() == comment_id);
          if (comment_index > -1) {
            if (this.messages[comment_index].replies == null) { this.messages[comment_index].replies = new Array<MessageModel>(); }
            this.messages[comment_index].replies.push({
              content: this.newMsg,
              created_at: new Date(),
              frime_id: this.frime_id,
              guest_id: this.userId,
              id: -1,
              likes: new Array<string>(),
              status: "0",
              updated_at: new Date(),
              user: this.currentUser,
              userimage: this.user.image,
              parent_id: +comment_id,
              isleft:false,
              replies: new Array<MessageModel>()
            });
          }

          // this.getComments();
          this.newMsg = "";
          // setTimeout(() => {
          //   this.content.scrollToBottom(200);
          // });
        }
      },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteComment(comment_reply: MessageModel) {
    if (!comment_reply) {
      return;
    }

    this.todoService.deleteComment(comment_reply.id.toString()).subscribe(
      (res) => {
        console.log(res);
        if (res["code"] === 200) {

          //Code to remove the comment from list
          let commentIndex: number = this.messages.findIndex(c => c.id == comment_reply.id);
          if (comment_reply.parent_id > 0) {
            commentIndex = this.messages.findIndex(c => c.id == comment_reply.parent_id);
            const replyIndex = this.messages[commentIndex].replies.findIndex(r => r.id == comment_reply.id);
            if (replyIndex > -1) {
              this.messages[commentIndex].replies.splice(replyIndex, 1);
            }
          } else {
            this.messages.splice(commentIndex, 1);
          }

          //   setTimeout(() => {
          //     this.content.scrollToBottom(200);
          //   });
          // } else {
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  myBackButton() {
    this.commonservice.isFriendFrime = false;
    this.location.back();
  }

  async cancelFirme() {
    const popover = await this.popoverController.create({
      component: FrimeCancelPage,
      componentProps: {
        frime_id: this.frime_id,
      },
      backdropDismiss: false,
    });

    popover.present();
    popover.onDidDismiss().then(async (value) => {
      console.log(value);
      if (value.data) {
        this.router.navigate(["/app/frime"]);
      }
    });
  }
  async leaveFirme() {
    const popover = await this.popoverController.create({
      component: FrimeLeavePage,
      componentProps: {
        frime_id: this.frime_id,
      },
      backdropDismiss: false,
    });

    popover.present();
    popover.onDidDismiss().then(async (value) => {
      console.log(value);
      if (value.data) {
        this.router.navigate(["/app/frimelist"]);
      }
    });
  }
}

