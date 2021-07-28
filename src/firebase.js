import firebase from "firebase"
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAM0SDMpxRo059qPkcgs80LeW9LZ72wEQE",
  authDomain: "teleniti.firebaseapp.com",
  projectId: "teleniti",
  storageBucket: "teleniti.appspot.com",
  messagingSenderId: "397390101201",
  appId: "1:397390101201:web:09c09ce5a94a906b9a63f0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;