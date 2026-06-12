let isRegister = false;

function toggleForm() {
  isRegister = !isRegister;

  document.getElementById("name").classList.toggle("hide");
  document.getElementById("formTitle").innerText = isRegister ? "Register" : "Login";
  document.getElementById("authBtn").innerText = isRegister ? "Register" : "Login";
  document.getElementById("switchText").innerText = isRegister
    ? "Already have an account?"
    : "Don't have an account?";

  document.querySelector(".switch a").innerText = isRegister ? "Login" : "Register";
  document.getElementById("message").innerText = "";
}

function handleAuth() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (email === "" || password === "") {
    message.style.color = "#f87171";
    message.innerText = "Please fill all required fields!";
    return;
  }

  if (isRegister) {
    if (name === "") {
      message.style.color = "#f87171";
      message.innerText = "Please enter your name!";
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    message.style.color = "#22c55e";
    message.innerText = "Registration successful! Now login.";
    toggleForm();
  } else {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      message.style.color = "#f87171";
      message.innerText = "No account found. Please register first.";
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("loggedIn", "true");
      showDashboard(savedUser);
    } else {
      message.style.color = "#f87171";
      message.innerText = "Invalid email or password!";
    }
  }
}

function showDashboard(user) {
  document.getElementById("authPage").classList.add("hide");
  document.getElementById("dashboard").classList.remove("hide");

  document.getElementById("userName").innerText = user.name;
  document.getElementById("userEmail").innerText = user.email;
}

function logout() {
  localStorage.removeItem("loggedIn");

  document.getElementById("dashboard").classList.add("hide");
  document.getElementById("authPage").classList.remove("hide");

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("message").innerText = "Logged out successfully!";
  document.getElementById("message").style.color = "#22c55e";
}

window.onload = function () {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const loggedIn = localStorage.getItem("loggedIn");

  if (savedUser && loggedIn === "true") {
    showDashboard(savedUser);
  }
};