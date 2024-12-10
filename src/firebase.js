import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwuL9gBamltC9UkpbfzBPRh3ax30bljec",
  authDomain: "real-time-chat-app-ac64d.firebaseapp.com",
  projectId: "real-time-chat-app-ac64d",
  storageBucket: "real-time-chat-app-ac64d.firebasestorage.app",
  messagingSenderId: "145015134034",
  appId: "1:145015134034:web:028f06a73e8cbc611c0c8b",
  measurementId: "G-LMZHGYRF34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
