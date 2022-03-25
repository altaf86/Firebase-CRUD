import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnYjhkuf_trfF1lCtq5676r7sLgz1s1AU",
  authDomain: "learn-firebase-24mar.firebaseapp.com",
  projectId: "learn-firebase-24mar",
  storageBucket: "learn-firebase-24mar.appspot.com",
  messagingSenderId: "371451684324",
  appId: "1:371451684324:web:890d334a79f858152d53f1",
};
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
