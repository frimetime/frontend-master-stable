importScripts("https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.17.2/firebase-messaging.js");



firebase.initializeApp({  
  apiKey: "AIzaSyBNRZ4-w7LWnmlNlWV83PGkkHZerpTi_mg",
  authDomain: "frimetime2020.firebaseapp.com",
  databaseURL: "https://frimetime2020.firebaseio.com",
  projectId: "frimetime2020",
  storageBucket: "frimetime2020.appspot.com",
  messagingSenderId: "848010872074",
  appId: "1:848010872074:web:2588fd11a7af74b0f666f3",
  measurementId: "G-6ZC4PXB3YZ",
  trackerID: "G-6ZC4PXB3YZ",
  vapidKey: "BIZxEpUQX1-4H3pd-fnPw5lxzxedijdJlmXQYMU-fhcBkkWsH5vi-YtoTQgnctmw9_Tnj2op4Y9N0bhMikeHXM8",
});

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  debugger;
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  // const notificationTitle = 'Background Message Title';
  // const notificationOptions = {
  //   body: 'Background Message body.',
  //   icon: '/firebase-logo.png'
  // };

  // return self.registration.showNotification(notificationTitle,
  //   notificationOptions);
});
