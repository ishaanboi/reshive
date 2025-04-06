// frontend/js/dashboard.js

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in.");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/profile/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      // Example: Insert into HTML
      document.getElementById("welcomeName").innerText = `Welcome, ${data.name}`;
      document.getElementById("userEmail").innerText = data.email;
      // You can also display other user data like interests, etc.
    } else {
      alert(data.message || "Failed to load profile");
    }
  } catch (err) {
    console.error("Dashboard load error:", err);
    alert("Something went wrong. Try again later.");
  }
});
