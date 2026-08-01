import {
  auth,
  db,
  doc,
  setDoc,
  serverTimestamp
} from "./firebase.js";

alert("auth.js loaded");

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName: fullname,
        email: email,
        role: "student",
        status: "active",
        createdAt: serverTimestamp()
      });

      message.innerText = "Registration Successful!";

    } catch (error) {

      message.innerText = error.message;

    }

  });

}

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

  loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    message.innerText = "";

    try {

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        message.innerText = "User profile not found.";
        return;
      }

      const role = userDoc.data().role;

      switch (role) {

        case "superadmin":
          window.location.href = "dashboard.html";
          break;

        case "admin":
          window.location.href = "admin.html";
          break;

        case "editor":
          window.location.href = "editor.html";
          break;

        case "teacher":
          window.location.href = "teacher.html";
          break;

        case "student":
          window.location.href = "student.html";
          break;

        default:
          message.innerText = "Invalid user role.";

      }

    } catch (error) {

      message.innerText = error.message;

    }

  });

}

const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

if (userEmail) {

  onAuthStateChanged(auth, async (user) => {

    if (!user) {
      window.location.href = "login.html";
      return;
    }

    userEmail.innerText = user.email;

    try {

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        await signOut(auth);
        window.location.href = "login.html";
        return;
      }

      const data = userDoc.data();

      if (data.status !== "active") {
        await signOut(auth);
        alert("Your account has been blocked.");
        window.location.href = "login.html";
      }

    } catch (error) {
      console.error(error);
    }

  });

}

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

  });

}
