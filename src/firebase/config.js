// Import the functions you need from the SDKs you need
import { FIREBASE_API,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSAGING_ID,APP_ID } from '@env';
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {collection, Firestore, getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_ID,
  appId: APP_ID
};

// Initialize Firebase
export const FirebaseApp= initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)

export const collectionRest = collection(FirebaseDB,'restaurants')
export const collectionOrders = collection(FirebaseDB, 'orders')



//allow read, write: if request.auth != null;