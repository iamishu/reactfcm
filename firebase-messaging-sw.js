importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

firebase.initializeApp({
// Project Settings => Add Firebase to your web app
apiKey: "AIzaSyBLHyS6cFDXeQL_V4o_TWv6p46JW2A4eho",
authDomain: "push-notify-a0da7.firebaseapp.com",
projectId: "push-notify-a0da7",
storageBucket: "push-notify-a0da7.appspot.com",
messagingSenderId: "133411563790",
appId: "1:133411563790:web:7bebf658b7048f45d20f5f"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});