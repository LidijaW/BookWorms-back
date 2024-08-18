
import admin from 'firebase-admin'

// Load the service account key JSON file
import serviceAccount from '../backend/bookworms-back-firebase.json' assert {type:'json'} ;
//const { debugErrorMap } = require('firebase/auth');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bookworms-back.firebaseio.com"
});

// Export the Firebase services
const db = admin.firestore();
//const auth = admin.auth();

export default db;






/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuP1yRKQw4uxal7NfiT62ztBnFwJZgg14",
  authDomain: "bookworms-back.firebaseapp.com",
  projectId: "bookworms-back",
  storageBucket: "bookworms-back.appspot.com",
  messagingSenderId: "165001694046",
  appId: "1:165001694046:web:48be0467b98f71d7c0ddcf"
};

// Initialize Firebase
const _db = initializeApp(firebaseConfig);


export {_db};

*/
