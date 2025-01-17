
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG7V5L4jfRG9LYh_vqT7lsPYOBGVIsOqc",
  authDomain: "deca-test-website.firebaseapp.com",
  projectId: "deca-test-website",
  storageBucket: "deca-test-website.appspot.com",
  messagingSenderId: "867976905039",
  appId: "1:867976905039:web:c447cd83096105b4ab853a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Functions for Email/Password and Google Sign-In
const emailSignUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const emailSignIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
const googleSignIn = () => signInWithPopup(auth, provider);
const logout = () => signOut(auth);

export { auth, db, doc, setDoc, getDoc, emailSignUp, emailSignIn, googleSignIn, logout };
