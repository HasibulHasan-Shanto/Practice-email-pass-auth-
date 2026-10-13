// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4NP8_HH_95m5THQ6Ym03HQ5G7OIpi1RU",
    authDomain: "practice--email-pass.firebaseapp.com",
    projectId: "practice--email-pass",
    storageBucket: "practice--email-pass.firebasestorage.app",
    messagingSenderId: "1026094059784",
    appId: "1:1026094059784:web:25c1c9c6227538509d9cbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)