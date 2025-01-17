import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG7V5L4jfRG9LYh_vqT7lsPYOBGVIsOqc",
  authDomain: "deca-test-website.firebaseapp.com",
  projectId: "deca-test-website",
  storageBucket: "deca-test-website.appspot.com",
  messagingSenderId: "867976905039",
  appId: "1:867976905039:web:c447cd83096105b4ab853a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, db, doc, setDoc, getDoc };
