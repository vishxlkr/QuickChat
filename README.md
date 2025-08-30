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

<img width="1412" height="783" alt="Screenshot 2025-08-02 002440" src="https://github.com/user-attachments/assets/6795fb6e-bd22-41d3-9c6f-380d33394a45" />
<img width="1424" height="802" alt="Screenshot 2025-08-02 002450" src="https://github.com/user-attachments/assets/b1231836-2686-4cf6-b01e-78e807c02a6f" />

<img width="1575" height="855" alt="Screenshot 2025-08-02 002418" src="https://github.com/user-attachments/assets/ede823ee-ad29-4be9-9ad1-38e1af6533e9" />

<img width="1595" height="847" alt="Screenshot 2025-08-02 002157" src="https://github.com/user-attachments/assets/2b5b22ff-540a-45a0-827d-ed909a484067" />

<img width="1537" height="825" alt="Screenshot 2025-08-02 002737" src="https://github.com/user-attachments/assets/42656efd-7ab8-4afc-a395-565a4a00aefb" />

<img width="1369" height="711" alt="Screenshot 2025-08-02 002228" src="https://github.com/user-attachments/assets/85434b6a-485e-4de3-9c72-33a94a4396a3" />

---

## 👨‍💻 Author

**Vishal Kumar **
[GitHub](https://github.com/vishxlkr)

---
