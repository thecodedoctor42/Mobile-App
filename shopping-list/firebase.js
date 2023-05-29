// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpp9q_h0O8ZSLtnOXjJts6NlcoZg_EVHY",
  authDomain: "shopping-list-3a29e.firebaseapp.com",
  projectId: "shopping-list-3a29e",
  storageBucket: "shopping-list-3a29e.appspot.com",
  messagingSenderId: "936212522329",
  appId: "1:936212522329:web:12fb8a7a2ed85c90d61848"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const itemsInDB = collection(database, "items")