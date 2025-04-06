// frontend/js/upload.js

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to upload.");
    window.location.href = "login.html";
    return;
  }

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:5000/api/papers/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      alert("Upload successful!");
      document.getElementById("uploadForm").reset();
    } else {
      alert(data.message || "Upload failed.");
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("Something went wrong. Try again.");
  }
});
