importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAkxCMqdTtVWZhLRm84Fynaeujxgdu72wA",
  authDomain: "ruralx-25630.firebaseapp.com",
  projectId: "ruralx-25630",
  messagingSenderId: "1008343120922",
  appId: "1:1008343120922:web:ed03b9d85c853f8824e5a3"

});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(
    payload.notification.title,
    { body: payload.notification.body }
  );
});
