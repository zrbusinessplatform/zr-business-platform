import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {

  registerBtn.addEventListener("click", async () => {

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

    message.innerText = "";

    if (!fullname || !email || !password || !confirmPassword) {
      message.innerText = "Please fill in all fields.";
      return;
    }

    if (password !== confirmPassword) {
      message.innerText = "Passwords do not match.";
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      message.innerText = "Registration Successful!";

    } catch (error) {
      message.innerText = error.message;
    }

  });

}

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

  loginBtn.addEventListener("click", async () => {
    alert("Login button clicked");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    message.innerText = "";

    try {

      await signInWithEmailAndPassword(auth, email, password);

      message.innerText = "Login Successful!";

      window.location.href = "dashboard.html";

    } catch (error) {

      message.innerText = error.message;

    }

  });

}

const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

if (userEmail) {

  onAuthStateChanged(auth, (user) => {

    if (user) {

      userEmail.innerText = user.email;

    } else {

      window.location.href = "login.html";

    }

  });

}

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

  });

}
