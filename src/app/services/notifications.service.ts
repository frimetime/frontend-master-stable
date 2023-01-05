import { Injectable } from '@angular/core';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        navigator.serviceWorker.ready.then((registration) => {
            // Don't crash an error if messaging not supported
            if (!firebase.messaging.isSupported()) {
                   resolve();
                   return;
            }

            const data=[];
            const ntitle=null;
            const messaging = firebase.messaging();
            messaging.usePublicVapidKey("BIZxEpUQX1-4H3pd-fnPw5lxzxedijdJlmXQYMU-fhcBkkWsH5vi-YtoTQgnctmw9_Tnj2op4Y9N0bhMikeHXM8");
            
            const tokenDivId = 'token_div';
            const permissionDivId = 'permission_div';
             // Initialize your VAPI key
             messaging.usePublicVapidKey(
                environment.firebase.vapidKey
          );

            // Register the Service Worker
            messaging.useServiceWorker(registration);

           

            // Optional and not covered in the article
            // Listen to messages when your app is in the foreground
            // messaging.onMessage((payload) => {
            //     debugger;
            //     //  localStorage.setItem("notificationTitle", payload.notification.title);
            //     // console.log('Message received not. ', payload);
            //     // // const nTag=payload.notification.tag;
            //     // // const nbody=payload.notification.body;

            //     // data.push(payload);
            //     // localStorage.setItem("data", JSON.stringify(data));
            //     //         console.log(payload);
            //     });
                // messaging.setBackgroundMessageHandler(function(payload) {
                //     debugger;
                //     // localStorage.setItem("notificationTitle", payload.notification.title);
                //     // console.log('Message received Notificationservice.ts ', payload);

                //     // data.push(payload);
                //     // localStorage.setItem("data", JSON.stringify(data));
                //     // alert(payload.data.badgeCount);
                //     // console.log(payload.data.badgeCount);
                    
                //     // //return self.registration.showNotification(title, options);
                //     });
            //Optional and not covered in the article
            // Handle token refresh
            messaging.onTokenRefresh(() => {
                messaging.getToken().then(
                (refreshedToken: string) => {
                    console.log(refreshedToken);
                    debugger;
                }).catch((err) => {
                    console.error(err);
                    
                });
            });

           
            resolve();
        }, (err) => {
            reject(err);
        });
    });
    
  }

  requestPermission(): Promise<void> {
    return new Promise<void>(async (resolve) => {
        if (!Notification) {
            resolve();
            return;
        }
        if (!firebase.messaging.isSupported()) {
            resolve();
            return;
        }
        try {
            const messaging = firebase.messaging();
            await messaging.requestPermission();

            const token: string = await messaging.getToken();
            localStorage.setItem("deviceID", token);
            console.log('User notifications token:', token);
            localStorage.setItem("deviceID", token);
            console.log("notification.service.ts.gloable_var "+ token);
        } catch (err) {
            // No notifications granted
        }

        resolve();
    });
}
}