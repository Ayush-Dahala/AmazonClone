import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDPvrsCjBnrRQX7bRltSrxuOP0quWTpiIg",
    authDomain: "clone-7f24c.firebaseapp.com",
    projectId: "clone-7f24c",
    storageBucket: "clone-7f24c.appspot.com",
    messagingSenderId: "770052554349",
    appId: "1:770052554349:web:3a0e0c844209b8b9ecc964",
    measurementId: "G-GTVBBEB98X"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig);
export const db=firebaseApp.firestore();
export const auth =firebase.auth();