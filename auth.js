import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword
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
