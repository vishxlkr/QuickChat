import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";

// create expres ap and http server
const app = express();
const server = http.createServer(app);

//middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Routes setup
app.use("/api/status", (req, res) => res.send("Server is Live."));
app.use("/api/auth", userRouter);

// connect to mongoDb
const startServer = async () => {
   await connectDB();

   const PORT = process.env.PORT || 5000;
   server.listen(PORT, () => {
      console.log("Server is running on PORT " + PORT);
   });
};

startServer();
