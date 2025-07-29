import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import { log } from "console";

// create expres ap and http server
const app = express();
const server = http.createServer(app);

// 👇 Add the URL of your deployed frontend
const allowedOrigins = [
   "https://quick-chat-client-git-main-vishxlkrs-projects.vercel.app",
];
app.use(
   cors({
      origin: function (origin, callback) {
         if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
         } else {
            callback(new Error("Not allowed by CORS"));
         }
      },
      credentials: true,
   })
);

// Initialize socket.io server
export const io = new Server(server, {
   cors: { origin: allowedOrigins[0], credentials: true },
});

// store online user
export const userSocketMap = {}; // {userId : socketId}

//socket.io conntection handler
io.on("connection", (socket) => {
   const userId = socket.handshake.query.userId;
   console.log("User connected", userId);

   if (userId) {
      userSocketMap[userId] = socket.id;
   }

   //emit online user to all connected client
   io.emit("getOnlineUsers", Object.keys(userSocketMap));

   socket.on("disconnect", () => {
      console.log("User Disconnected", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
   });
});

//middleware setup
app.use(express.json({ limit: "4mb" }));

// Routes setup
app.use("/api/status", (req, res) => res.send("Server is Live."));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// connect to mongoDb
await connectDB();

if (process.env.NODE_ENV !== "production") {
   const PORT = process.env.PORT || 5000;
   server.listen(PORT, () =>
      console.log("Server is running on PORT : " + PORT)
   );
}

// export server for vercel
export default server;
