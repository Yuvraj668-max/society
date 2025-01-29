// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCE8Ou0sDDtOf5tBExETvEVIwaDaKdLGJs",
  authDomain: "society-f18fa.firebaseapp.com",
  projectId: "society-f18fa",
  storageBucket: "society-f18fa.firebasestorage.app",
  messagingSenderId: "656686496597",
  appId: "1:656686496597:web:640c0a6535a38cf0278ddc",
  measurementId: "G-8F14EXN1C0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app); // Make sure db is being exported
export const auth = getAuth(app); // Export auth if needed elsewhere
