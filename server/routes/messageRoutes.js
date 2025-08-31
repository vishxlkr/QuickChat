import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
   getMessages,
   getUserForSidebar,
   markMessageAsSeen,
   sendMessage,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUserForSidebar); // get all the messages for the left side bar

messageRouter.get("/:id", protectRoute, getMessages); // get all messages for the a particular person chat

messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen); // maark the message seen for the particular message while chatting

messageRouter.post("/send/:id", protectRoute, sendMessage); // to send message

export default messageRouter;
