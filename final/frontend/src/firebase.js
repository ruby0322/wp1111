import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDgWzJmcD4dE_Z-oIlZo5y4g5OrMsr5Ig",
  authDomain: "wp-final-project-af0a8.firebaseapp.com",
  databaseURL: "https://wp-final-project-af0a8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wp-final-project-af0a8",
  storageBucket: "wp-final-project-af0a8.appspot.com",
  messagingSenderId: "212642175192",
  appId: "1:212642175192:web:6bc5a0c70a7f3dedecdfad",
  measurementId: "G-RNG0D1NH1G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
