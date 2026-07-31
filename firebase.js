// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb_5uvucPU675nVXX5wk-As3BOt1K7rB8",
  authDomain: "zr-business-platform-67b07.firebaseapp.com",
  projectId: "zr-business-platform-67b07",
  storageBucket: "zr-business-platform-67b07.firebasestorage.app",
  messagingSenderId: "127810584577",
  appId: "1:127810584577:web:3355f717d4f10467124000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("Firebase Connected Successfully");

// Authentication
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firestore
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

// Export
export { auth, db };
