# MERN Chat App - API & Data Flow Notes

This document outlines the end-to-end data flow for key features in the chat application, covering client-side actions, backend API endpoints, and real-time socket events.

---

## Authentication — Signup

**Client:**

-  User fills signup form in `src/pages/LoginPage.jsx` (signup view).
-  Component state updates with `name`, `email`, `password`.
-  Axios POST sent to `POST /api/auth/register` (from client utils).

**Backend:**

-  **Route:** `userRoutes.js` or an auth route handles `POST /api/auth/register`.
-  **Controller:** `userController.js` validates input.
-  Checks if email exists via `User` model (`server/models/User.js`).
-  Hashes password and creates a new `User` in MongoDB.
-  Creates a JWT token.
-  **Success Response:** `{ success: true, token, user }`
-  **Error Response:** `{ success: false, message }`

**Client:**

-  Stores the token in `AuthContext` (`client/src/context/AuthContext.jsx`) or `localStorage`.
-  Updates the auth state and redirects to the chat (`HomePage`).

---

## Authentication — Login

**Client:**

-  User enters `email` and `password` in `LoginPage.jsx`.
-  Axios POST sent to `POST /api/auth/login`.

**Backend:**

-  **Controller:** Validates credentials against the `User` model.
-  Compares the hashed password and issues a JWT on success.
-  **Success Response:** `{ success: true, token, user }`
-  **Error Response:** `{ success: false, message }`

**Client:**

-  Saves the token, updates `AuthContext`, and navigates to `HomePage` (chat).

---

## Get Current User / Get Profile

**Client:**

-  On application start, `AuthContext` checks for a token.
-  If a token exists, it requests the user profile.
-  Protected requests include the `Authorization: Bearer <token>` header.

**Backend:**

-  **Middleware:** `auth.js` middleware verifies the JWT and attaches `req.userId`.
-  **Controller:** `userController` fetches the user document by the ID from `req.userId`.
-  **Success Response:** `{ success: true, user }` or `{ success: true, user: { ... } }`
-  **Error Response:** `{ success: false, message }`

**Client:**

-  Stores the returned user object in `AuthContext` and displays info in the UI (e.g., `Sidebar/ProfilePage.jsx`).

---

## Update Profile (Info + Avatar)

**Client:**

-  User edits information in `src/pages/ProfilePage.jsx`.
-  If an avatar image is selected, the client uploads it to Cloudinary.
-  Sends a `PUT` request to `/api/users/profile` with updated fields and the new avatar URL.

**Backend:**

-  **Route:** `userRoutes.js` handles `PUT /api/users/profile`.
-  **Controller:** `userController.js` validates the input and updates the `User` model.
-  **Success Response:** `{ success: true, user }` (the updated user object)
-  **Error Response:** `{ success: false, message }`

**Client:**

-  Replaces the `user` object in `AuthContext` with the returned data and updates the UI.

---

## Get & Search Users

**Client:**

-  The `Sidebar.jsx` component triggers a `GET` request to `/api/users` or `/api/users/search?query=...`.
-  The Axios request includes the auth token in the headers.

**Backend:**

-  **Route:** `userRoutes.js` handles `GET /api/users` and `/api/users/search`.
-  **Controller:** Queries the `User` model, filtering out the current user and sanitizing results.
-  **Success Response:** `{ success: true, users }` (where `users` is an array of user objects)
-  **Error Response:** `{ success: false, message }`

**Client:**

-  Updates the state in the `Sidebar` to display the list of users or search results.

---

## Real-Time Features (Socket.IO)

### Get Online Users

**Client:**

-  On `HomePage` mount, the client connects to the Socket.io server.
-  Emits an `"addUser"` event with its own `userId`.
-  Listens for a `"getUsers"` event to receive the list of online users.

**Backend:**

-  The main `server.js` file tracks connected sockets and maps them to `userIds`.
-  When a user connects or disconnects, the server emits a `"getUsers"` event to all connected clients with the updated list.
-  **Socket Event:** `getUsers`
-  **Payload:** `{ onlineUsers: [...] }` or an array of user IDs `[userId1, userId2, ...]`.

**Client:**

-  Updates state in a context (e.g., `ChatContext`) or the `Sidebar` to reflect users' online status.

### Send & Receive Messages

**Client (Sender):**

-  User types a message in `ChatContainer.jsx` and submits.
-  A `POST` request is sent to `/api/messages` with `{ sender, recipient, content }`.
-  Simultaneously, a `"sendMessage"` socket event is emitted with the same payload for real-time delivery.

**Backend (HTTP):**

-  **Route:** `POST /api/messages` is handled by `messageController.createMessage`.
-  **Controller:** Validates the request body and creates a new `Message` document.
-  **Success Response:** `{ success: true, message }` (the newly saved message object)
-  **Error Response:** `{ success: false, message }`

**Backend (Socket):**

-  On receiving a `"sendMessage"` event, the server finds the recipient's socket ID.
-  It then emits a `"getMessage"` event directly to the recipient.
-  **Socket Event:** `getMessage`
-  **Payload:** `{ _id, sender, recipient, content, image?, createdAt }`

**Client (Recipient):**

-  The listener for the `"getMessage"` event receives the new message payload.
-  Appends the new message to the messages state in `ChatContainer.jsx`.

### Send Image Message

**Client:**

-  User selects an image file.
-  Client uploads the image to Cloudinary and receives a secure URL.
-  Sends a `POST` request to `/api/messages` with `{ sender, recipient, image: imageUrl }`.

**Backend:**

-  The `messageController` stores the message with the `image` field in the `Message` model.
-  Broadcasts the new image message via sockets, same as a text message.
-  **Success Response:** `{ success: true, message }` (where `message.image` contains the URL)
-  **Error Response:** `{ success: false, message }`

**Client:**

-  Appends the new message to the state and renders the image in the chat UI.

---

## General Data Structures

#### Socket Events Summary

-  **Client Emits:**
   -  `"addUser"`: payload is `userId`
   -  `"sendMessage"`: payload is `{ sender, recipient, content, image? }`
-  **Server Emits:**
   -  `"getUsers"`: payload is `{ onlineUsers: [...] }`
   -  `"getMessage"`: payload is the full message object
   -  `"userDisconnected"`: can be an updated online users list

#### Common Error Response (All Endpoints)

-  **Body:** `{ success: false, message: "Error message here" }`
-  **Status Codes:** `200`/`201` on success, `400`/`401`/`404`/`500` on errors.
