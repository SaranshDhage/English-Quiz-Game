// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHEouUVZpod6RlwYilCmyCU7_no7egAFk",
  authDomain: "signin-79cee.firebaseapp.com",
  projectId: "signin-79cee",
  storageBucket: "signin-79cee.appspot.com",
  messagingSenderId: "956335173811",
  appId: "1:956335173811:web:1588b04f6773ff2abac0c6",
  measurementId: "G-8T9ME7F4X0",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const initFirebase = () => {
  return app;
};

export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
export default app;
export const auth = getAuth(app);