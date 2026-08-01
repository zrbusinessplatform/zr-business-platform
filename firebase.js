// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Authentication
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCb_5uvucPU675nVXX5wk-As3BOt1K7rB8",
  authDomain: "zr-business-platform-67b07.firebaseapp.com",
  projectId: "zr-business-platform-67b07",
  storageBucket: "zr-business-platform-67b07.firebasestorage.app",
  messagingSenderId: "127810584577",
  appId: "1:127810584577:web:3355f717d4f10467124000"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  db,
  doc,
  setDoc,
  serverTimestamp
};
