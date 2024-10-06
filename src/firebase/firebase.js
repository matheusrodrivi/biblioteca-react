import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB1v1ULzb2l1Iau7FgqM25Zu2li3xjp8pk",
    authDomain: "biblioteca-ab73e.firebaseapp.com",
    projectId: "biblioteca-ab73e",
    storageBucket: "biblioteca-ab73e.appspot.com",
    messagingSenderId: "597347491050",
    appId: "1:597347491050:web:d15116d4821161ee56cb93",
    measurementId: "G-FXV271VYF6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };