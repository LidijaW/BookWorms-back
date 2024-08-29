import admin from "firebase-admin";

//service account key JSON file
import serviceAccount from "../backend/bookworms-back-firebase.json" assert { type: "json" };

// Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bookworms-back.firebaseio.com",
});

//  Firestore database instance
const db = admin.firestore();

export default db;
