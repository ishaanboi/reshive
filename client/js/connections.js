window.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'login.html';

  const res = await fetch('http://localhost:5000/api/networking/connections', {
    headers: { 'Authorization': token }
  });
  const data = await res.json();

  const container = document.getElementById('connectionsList');
  if (res.ok && Array.isArray(data)) {
    data.forEach(conn => {
      const otherUser = conn.sender._id === JSON.parse(atob(token.split('.')[1])).id ? conn.receiver : conn.sender;
      const card = document.createElement('div');
      card.className = 'connection-card';
      card.innerHTML = `
        <h4>${otherUser.name}</h4>
        <p>${otherUser.email}</p>
        <p><em>${otherUser.institution || ''}</em></p>
      `;
      container.appendChild(card);
    });
  } else {
    container.innerHTML = '<p>No connections found.</p>';
  }
});
