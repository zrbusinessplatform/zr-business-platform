import { auth } from "./firebase.js";

console.log("Authentication Ready");

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    console.log("Register button clicked");
  });
}

import { createUserWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("message");

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {

    if (password.value !== confirmPassword.value) {
      message.innerText = "Passwords do not match!";
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      message.innerText = "Registration Successful!";
    } catch (error) {
      message.innerText = error.message;
    }

  });
}
