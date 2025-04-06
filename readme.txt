# Hive - Researcher Connect Platform

Hive is a web app where users can log in, manage their profile, and view or share research papers. It includes authentication, dynamic content updates, and a simple UI for researcher interaction.

## 🧰 Dependencies & Their Use

### Backend
- **express** – Handles server and API routes.
- **mongoose** – Connects and interacts with MongoDB.
- **jsonwebtoken (jwt)** – Secures login/authentication.
- **bcryptjs** – Hashes user passwords securely.
- **dotenv** – Loads environment variables (like DB URI, JWT secret).

### Frontend
- **react** – Builds the user interface with components.
- **axios** – Sends HTTP requests to the backend.
- **react-router-dom** (if used) – Manages routing between pages.

### Database
- **MongoDB** – Stores user data, messages, and papers.

## 📦 Installation Commands

### Backend
```bash
cd server
npm install express mongoose jsonwebtoken bcryptjs dotenv

cd client
npm install react axios react-router-dom

video to instructions and working model

https://drive.google.com/file/d/1PvwDz8qfgRaTmOopQKr1RbSrmktrjI1g/view?usp=sharing