// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZOzDpEmGZv6bXblPiVxVMO7XmKJ0zUcM",
  authDomain: "binging-bot.firebaseapp.com",
  projectId: "binging-bot",
  storageBucket: "binging-bot.appspot.com",
  messagingSenderId: "541647704898",
  appId: "1:541647704898:web:55738ccdbb8cc90ad56edb",
  measurementId: "G-9V2P4219D6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("🚀 ~ app:", app)
const analytics = getAnalytics(app);
console.log("🚀 ~ analytics:", analytics)
export const provider = new GoogleAuthProvider();
export const auth = getAuth();