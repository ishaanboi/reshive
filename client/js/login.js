// frontend/js/login.js

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Error during login:", err);
    alert("Something went wrong. Try again later.");
  }
});
