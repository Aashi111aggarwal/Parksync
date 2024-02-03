// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

apiKey: "AIzaSyDwCQ0UG8dZ2hfhbnnp1v9ChpGtrFGXKTM",

authDomain: "parksync-4ae44.firebaseapp.com",

projectId: "parksync-4ae44",

storageBucket: "parksync-4ae44.appspot.com",

messagingSenderId: "650845256300",

appId: "1:650845256300:web:41f9d0a91d86dda31eb649",

measurementId: "G-14F0EMF5SH"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app) 