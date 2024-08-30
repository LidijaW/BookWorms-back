import admin from "firebase-admin";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBuP1yRKQw4uxal7NfiT62ztBnFwJZgg14",
  authDomain: "bookworms-back.firebaseapp.com",
  projectId: "bookworms-back",
  storageBucket: "bookworms-back.appspot.com",
  messagingSenderId: "165001694046",
  appId: "1:165001694046:web:48be0467b98f71d7c0ddcf",
};


// Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bookworms-back.firebaseio.com",
});

//  Firestore database instance
const db = admin.firestore();

export default db;
