import firebase from "firebase/compat/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = getAuth();
export const authService = firebase.auth();
export const dbService = getFirestore();
export const storageService = getStorage();