// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAzMHN1Ng10Ht_9iWbiPLrVg2D29Iy4Juc",
  authDomain: "chat-realtime-9be97.firebaseapp.com",
  projectId: "chat-realtime-9be97",
  storageBucket: "chat-realtime-9be97.appspot.com",
  messagingSenderId: "408586760247",
  appId: "1:408586760247:web:0ac99aecebd2d9e9694fb2",
  measurementId: "G-DP5ZT8LH0S"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app)
const provider = new GoogleAuthProvider


export {db, auth, provider, app }



