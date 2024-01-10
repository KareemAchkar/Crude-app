import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLH_tAPeGBYmAvXjDHzkgN8mxMlnivEQI",
  authDomain: "react-crud-redux-6c62c.firebaseapp.com",
  projectId: "react-crud-redux-6c62c",
  storageBucket: "react-crud-redux-6c62c.appspot.com",
  messagingSenderId: "1050950543670",
  appId: "1:1050950543670:web:dfa25cf5936f5924576b97",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
