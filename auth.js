import {
  auth,
  db,
  doc,
  setDoc,
  serverTimestamp
} from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
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
    alert("Login button clicked");

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

message.innerText = "Login Successful!";

const userDoc = await getDoc(doc(db, "users", "admin001"));

if (userDoc.exists()) {

  const role = userDoc.data().role;

  if (role === "superadmin") {

    window.location.href = "dashboard.html";

  } else {

    alert("Role not found.");

  }

} else {

  alert("User data not found.");

}

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
