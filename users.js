import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const tableBody = document.getElementById("userTableBody");

async function loadUsers() {

  tableBody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {

    const querySnapshot = await getDocs(collection(db, "users"));

    tableBody.innerHTML = "";

    querySnapshot.forEach((doc) => {

      const user = doc.data();

      tableBody.innerHTML += `
        <tr>
          <td>${user.fullName || "-"}</td>
          <td>${user.email || "-"}</td>
          <td>${user.role || "-"}</td>
          <td>${user.status || "-"}</td>
          <td>Edit</td>
        </tr>
      `;

    });

  } catch (error) {

    tableBody.innerHTML =
      "<tr><td colspan='5'>Failed to load users.</td></tr>";

    console.error(error);

  }

}

loadUsers();
