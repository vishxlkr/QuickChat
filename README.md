# 💬 QuickChat — Real-Time Chat Application

QuickChat is a modern full-stack chat app built using the MERN stack and Socket.IO. It enables real-time messaging, online user visibility, and secure authentication. Designed with a clean UI and responsive layout, it's ideal for personal or portfolio projects.

---

## 🧰 Tech Stack

-  **Frontend**: React 18+, Vite, Tailwind CSS
-  **Backend**: Node.js, Express.js, MongoDB (Mongoose)
-  **Real-time**: Socket.IO
-  **Authentication**: JSON Web Tokens (JWT), Protected Routes
-  **Image Upload (optional)**: Multer + ImageKit

---

## 📦 Features

-  ✅ User Registration & Login
-  ✅ JWT-based authentication
-  ✅ Real-time 1:1 messaging with Socket.IO
-  ✅ Online user tracking
-  ✅ Profile update support
-  ✅ Responsive UI built with Tailwind CSS
-  ✅ Local development-friendly environment setup

---

## 📁 Folder Structure

```
quickchat/
├── frontend/                # React app
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── lib/db.js
│   └── server.js
```

---

## 🔐 Environment Variables

### ✅ Backend `.env`

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### ✅ Frontend `.env`

```
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🛠️ Getting Started Locally

### 1. Clone the Repo

```bash
git clone https://github.com/vishxlkr/quickchat.git
cd quickchat
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 🔄 API Endpoints

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| GET    | `/api/status`              | Server status check   |
| POST   | `/api/auth/register`       | Register new user     |
| POST   | `/api/auth/login`          | Login user            |
| GET    | `/api/auth/check`          | Check JWT auth        |
| PUT    | `/api/auth/update-profile` | Update user profile   |
| POST   | `/api/messages/send/:id`   | Send message to user  |
| GET    | `/api/messages/:id`        | Fetch message history |

---

## ⚡ Socket.IO Events

| Event            | Triggered On     | Description                     |
| ---------------- | ---------------- | ------------------------------- |
| `connection`     | On user connect  | Registers user socket session   |
| `disconnect`     | On user leave    | Removes user from online list   |
| `getOnlineUsers` | Realtime updates | Broadcasts current online users |

---

## 📷 Screenshots

> (You can insert login page, chat screen, etc.)

---

## 👨‍💻 Author

**Vishal Kumar **
[GitHub](https://github.com/vishxlkr)

---
