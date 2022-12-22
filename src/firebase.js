// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import {getAuth, signOut} from'firebase/auth'
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDEeqjEbOq_CcJLqZI3Z5UQixUe1p9XkRI",
  authDomain: "resellers2-6ea66.firebaseapp.com",
  projectId: "resellers2-6ea66",
  storageBucket: "resellers2-6ea66.appspot.com",
  messagingSenderId: "682113583860",
  appId: "1:682113583860:web:44e50dde42d80ed7f16ca1",
  measurementId: "G-5PG5HL8ZL4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth(app)

export const db = getFirestore(app);

