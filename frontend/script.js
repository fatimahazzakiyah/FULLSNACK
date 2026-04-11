const API = "http://localhost:5000/api/auth";

/* LOGIN */
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);

      if (data.message === "Login berhasil") {
        localStorage.setItem("login", "true");
        window.location.href = "dashboard.html";
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Server tidak terhubung");
    });
}

/* REGISTER */
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
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((err) => {
      console.log(err);
      alert("Server tidak terhubung");
    });
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("login");

  alert("Logout berhasil");

  window.location.href = "login.html";
}

//update by dd arra//
