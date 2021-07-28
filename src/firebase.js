import firebase from "firebase"
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "teleniti.firebaseapp.com",
  projectId: "teleniti",
  storageBucket: "teleniti.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;