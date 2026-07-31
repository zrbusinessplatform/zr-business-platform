import { auth } from "./firebase.js";

console.log("Authentication Ready");

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    console.log("Register button clicked");
  });
}
