import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

// get all user except the logged in user
export const getUserForSidebar = async (req, res) => {
   try {
      const userId = req.user._id;
      const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
         "-password"
      );

      // count number of message not seen
      const unseenMessages = {};
      const promises = filteredUsers.map(async (user) => {
         const messages = await Message.find({
            senderId: user._id,
            recieverId: userId,
            seen: false,
         });
         if (messages.length > 0) {
            unseenMessages[user._id] = messages.length;
         }
      });
      await Promise.all(promises);
      res.json({ success: true, user: filteredUsers, unseenMessages });
   } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
   }
};

//get al messages for selected user

export const getMessages = async (req, res) => {
   try {
      const { id: selectedUserId } = req.params;
      const myId = req.user._id;
      const messages = await Message.find({
         $or: [
            { senderId: myId, recieverId: selectedUserId },
            { senderId: selectedUserId, recieverId: myId },
         ],
      });
      await Message.updateMany(
         { senderId: selectedUserId, recieverId: myId },
         { seen: true }
      );

      res.json({ success: true, messages });
   } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
   }
};

// api to mark message as seen using messsage id for individual id

export const markMessageAsSeen = async (req, res) => {
   try {
      const { id } = req.params;
      await Message.findByIdAndUpdate(id, { seen: true });
      res.json({ success: true });
   } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
   }
};

// send message to selected user

export const sendMessage = async (req, res) => {
   try {
      const { text, image } = req.body;
      const recieverId = req.params.id;
      const senderId = req.user._id;

      let imageUrl;
      if (image) {
         const uploadResponse = await cloudinary.uploader.upload(image);
         imageUrl = uploadResponse.secure_url;
      }

      const newMessage = await Message.create({
         senderId,
         recieverId,
         text,
         image: imageUrl,
      });

      res.json({
         success: true,
         newMessage,
      });

      // emit the new message to the reciever's socket
      const receiverSocketId = userSocketMap[recieverId];
      if (receiverSocketId) {
         io.to(receiverSocketId).emit("newMessage", newMessage);
      }
   } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
   }
};
