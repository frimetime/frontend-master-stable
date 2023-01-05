// const { connected } = require("node:process");

importScripts("https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.min.js");


firebase.initializeApp({  
  apiKey: "AIzaSyBNRZ4-w7LWnmlNlWV83PGkkHZerpTi_mg",
  authDomain: "https://frimetime2020.firebaseapp.com",
  databaseURL: "https://frimetime2020.firebaseio.com",
  projectId: "frimetime2020",
  storageBucket: "frimetime2020.appspot.com",
  messagingSenderId: "848010872074",
  appId: "1:848010872074:web:2588fd11a7af74b0f666f3",
  measurementId: "G-77NDJ573VK",
  trackerID: "G-77NDJ573VK",
  vapidKey: "BIZxEpUQX1-4H3pd-fnPw5lxzxedijdJlmXQYMU-fhcBkkWsH5vi-YtoTQgnctmw9_Tnj2op4Y9N0bhMikeHXM8",
});

const data=[];

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
messaging.getToken("BIZxEpUQX1-4H3pd-fnPw5lxzxedijdJlmXQYMU-fhcBkkWsH5vi-YtoTQgnctmw9_Tnj2op4Y9N0bhMikeHXM8");


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]

// AYESHA

messaging.onBackgroundMessage(function(payload) {
  debugger;
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
});
//var notif = JSON.parse(payload.notification);
 
    //   const notificationTitle = 'notif.title';
    // const notificationOptions = {
    //   body: 'notif.body',
    //   icon: 'icon',
    // };

    // return self.registration.showNotification(notificationTitle,
    //      notificationOptions);
// HERBERT

// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   return self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });





// messaging.setBackgroundMessageHandler(function(payload) {
//         debugger;
//         console.log('[firebase-messaging-sw.js] Received background message ', payload);
//         // Customize notification here
//         console.log('Message received Firebase.messaging-sw.js. ', payload);
 
//       //  try{
//       //   payload.data.notification = JSON.parse(payload.data.notification);
//       //   data.push(payload);
//       //   debugger;
//       //   localforage.setItem("data", JSON.stringify(data));
//       //   }
//       //   catch(e)
//       //   {
//       //   data.push(payload);
//       //   localforage.setItem("data", JSON.stringify(data));
//       //   }
//   //     const notificationTitle = payload.data.notification.title;
//   //     const notificationOptions = {
//   //         body: 'payload.data.notification',
//   //       icon: 'payload.data.notification.icon'
//   //     };

//   // return self.registration.showNotification(notificationTitle,
//   //   notificationOptions);
//   // return self.registration.showNotification(payload.data.title, {
//   //   body: payload.data.body,
//   //   icon: payload.data.icon,
//   //   tag: payload.data.tag,
//   //   data: payload.data.link
//   // });
// });


// messaging.setBackgroundMessageHandler(function(payload) {
//   debugger;
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   console.log('Message received Firebase.messaging-sw.js. ', payload);
//   // payload.data.notification = JSON.parse(payload.data.notification);
//   // data.push(payload);
//   // localforage.setItem("data", JSON.stringify(data));

// //   if( payload.data.notification != null && payload.data.notification != 'undefined'){
// //     payload.data.notification = JSON.parse(payload.data.notification);
// //     data.push(payload);
// //     localforage.setItem("data", JSON.stringify(data));
// // }
// // else{
// //     data.push(payload);
// //     localforage.setItem("data", JSON.stringify(data));
// // }
// const notificationTitle = payload.data.notification.title;
//       const notificationOptions = {
//           body:"test",
//         icon: "tstdh"
//       };

// return self.registration.showNotification(notificationTitle,
// notificationOptions);
// });
//   body: payload.data.notification.body,
        // icon: payload.data.notification.icon