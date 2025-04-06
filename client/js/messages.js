window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) return (window.location.href = "login.html");

  const chatList = document.getElementById("chatList");
  const messageBox = document.getElementById("chatMessages");
  const form = document.getElementById("messageForm");
  const input = document.getElementById("messageInput");

  let currentUserId = null;

  async function loadChats() {
    const res = await fetch("http://localhost:5000/api/messages/recent", {
      headers: { Authorization: token },
    });
    const messages = await res.json();
    if (Array.isArray(messages)) {
      messages.forEach((msg) => {
        const li = document.createElement("li");
        const otherUser =
          msg.sender._id === JSON.parse(atob(token.split(".")[1])).id
            ? msg.receiver
            : msg.sender;
        li.textContent = otherUser.name;
        li.onclick = () => loadConversation(otherUser._id, otherUser.name);
        chatList.appendChild(li);
      });
    }
  }

  async function loadConversation(userId, userName) {
    currentUserId = userId;
    messageBox.innerHTML = `<h4>Chat with ${userName}</h4>`;
    const res = await fetch(
      `http://localhost:5000/api/messages/conversation/${userId}`,
      {
        headers: { Authorization: token },
      }
    );
    const messages = await res.json();
    messages.forEach((m) => {
      const div = document.createElement("div");
      div.textContent =
        (m.sender._id === userId ? userName : "You") + ": " + m.content;
      messageBox.appendChild(div);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUserId) return;
    const res = await fetch("http://localhost:5000/api/messages/send", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverId: currentUserId, content: input.value }),
    });
    const result = await res.json();
    if (res.ok) {
      const div = document.createElement("div");
      div.textContent = "You: " + input.value;
      messageBox.appendChild(div);
      input.value = "";
    }
  });

  loadChats();
});
fetch("./data/papers.json");
