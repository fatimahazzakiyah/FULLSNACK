const API = "http://localhost:5000/api/auth";

// REGISTER
function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role: "user",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      window.location.href = "login.html";
    });
}

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);

      if (data.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "dashboard.html";
      }
    });
}

// LOGOUT
function logout() {
  alert("Logout berhasil");
  window.location.href = "login.html";
}

//update code//
