// frontend/js/profile.js

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById("profileName").textContent = data.name;
      document.getElementById("profileEmail").textContent = data.email;
    } else {
      alert("Failed to fetch profile.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
});
