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
  apiKey: "AIzaSyC8OypaaSyQuVOiJyBN1L2ay6PmIgDajVY",
  authDomain: "realtime-chat-1d824.firebaseapp.com",
  projectId: "realtime-chat-1d824",
  storageBucket: "realtime-chat-1d824.appspot.com",
  messagingSenderId: "468238488473",
  appId: "1:468238488473:web:32ffad01c0ae47ed40f908",
  measurementId: "G-Z3GGPM6V8C"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app)
const provider = new GoogleAuthProvider


export {db, auth, provider, app }



