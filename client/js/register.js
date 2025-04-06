// frontend/js/register.js

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    console.error("Error during registration:", err);
    alert("Something went wrong. Try again later.");
  }
});
