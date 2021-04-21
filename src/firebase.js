import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBLHyS6cFDXeQL_V4o_TWv6p46JW2A4eho",
  authDomain: "push-notify-a0da7.firebaseapp.com",
  projectId: "push-notify-a0da7",
  storageBucket: "push-notify-a0da7.appspot.com",
  messagingSenderId: "133411563790",
  appId: "1:133411563790:web:7bebf658b7048f45d20f5f"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
    "BFtDve2zjg6sjYT1xcwFfX6l98zA9YwTTvWKw38cm5rxpRVsNCKnQLksfvqMHP5NogFbUVCpVgD5dD5Ybg2G2FQ"
);
  
export { messaging };