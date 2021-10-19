import * as firebase from "firebase"
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBXmFC3pzmXfX24KLHgl_Re9rbIR6zQJJw",
    authDomain: "to-do-list-23758.firebaseapp.com",
    projectId: "to-do-list-23758",
    storageBucket: "to-do-list-23758.appspot.com",
    messagingSenderId: "265180774089",
    appId: "1:265180774089:web:6da92055998db13ebcd718"
  };

let app; 

if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };