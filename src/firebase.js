import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication Functions
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

// Firestore Functions
const saveUserProgress = async (userId, progress) => {
  try {
    await setDoc(doc(db, "users", userId), { progress });
    console.log("User progress saved!");
  } catch (error) {
    console.error("Error saving progress:", error);
    throw error;
  }
};

const getUserProgress = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data().progress : null;
  } catch (error) {
    console.error("Error retrieving progress:", error);
    throw error;
  }
};

export { auth, registerUser, loginUser, logoutUser, db, saveUserProgress, getUserProgress };
