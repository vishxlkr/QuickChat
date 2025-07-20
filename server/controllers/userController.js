import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloundinary from "../lib/cloudinary.js";

// Sign up  a new user
export const signup = async (req, res) => {
   const { fullName, email, password, bio } = req.body;

   try {
      if (!fullName || !email || !password || !bio) {
         return res.json({ sucess: false, message: "Missing deatails" });
      }

      const user = await User.findOne({ email });
      if (user) {
         return res.json({ sucess: false, message: "Account already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
         fullName,
         email,
         password: hashedPassword,
         bio,
      });

      const token = generateToken(newUser._id);

      res.json({
         success: true,
         userDate: newUser,
         token,
         message: "Account created Successfully.",
      });
   } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
   }
};

// controller to login a user

export const login = async (req, res) => {
   try {
      const { fullName, email, password, bio } = req.body;
      const userData = await User.findOne({ email });
      const isPasswordCorrect = await bcrypt.compare(
         password,
         userData.password
      );
      if (!isPasswordCorrect) {
         return res.json({ success: false, message: "Invalid Credentials. " });

         const token = generateToken(newUser._id);

         res.json({
            success: true,
            userDate,
            token,
            message: "Login Successfully.",
         });
      }
   } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
   }
};

// contoller to check if user is authenticated

export const checkAuth = (req, res) => {
   res.json({ success: true, user: req.user });
};

// controller to update user profile details

export const updateProfile = async (req, res) => {
   try {
      const { profilePic, bio, fullName } = req.body;
      const userId = req.user._id;
      let updatedUser;
      if (!profilePic) {
         updatedUser = await User.findByIdAndUpdate(
            userId,
            { bio, fullName },
            { new: true }
         );
      } else {
         const upload = await cloundinary.uploader.upload(profilePic);
         updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: upload.secure_url, bio, fullName },
            { new: true }
         );
      }
      res.json({ success: true, user: updatedUser });
   } catch (error) {
      console.log(error.mesage);
      res.json({ success: false, message: error.mesage });
   }
};

// hi

//////////////////////////////////////////////////////////////////////////////////
// import { generateToken } from "../lib/utils.js";
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import cloudinary from "../lib/cloudinary.js";

// // Sign up a new user
// export const signup = async (req, res) => {
//    const { fullName, email, password, bio } = req.body;

//    try {
//       if (!fullName || !email || !password || !bio) {
//          return res.json({ success: false, message: "Missing details" });
//       }

//       const user = await User.findOne({ email });
//       if (user) {
//          return res.json({ success: false, message: "Account already exists" });
//       }

//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       const newUser = await User.create({
//          fullName,
//          email,
//          password: hashedPassword,
//          bio,
//       });

//       const token = generateToken(newUser._id);

//       res.json({
//          success: true,
//          userData: newUser,
//          token,
//          message: "Account created successfully.",
//       });
//    } catch (error) {
//       console.log(error.message);
//       res.json({ success: false, message: error.message });
//    }
// };

// // Login controller
// export const login = async (req, res) => {
//    try {
//       const { email, password } = req.body;

//       const userData = await User.findOne({ email });
//       if (!userData) {
//          return res.json({ success: false, message: "Invalid credentials." });
//       }

//       const isPasswordCorrect = await bcrypt.compare(
//          password,
//          userData.password
//       );
//       if (!isPasswordCorrect) {
//          return res.json({ success: false, message: "Invalid credentials." });
//       }

//       const token = generateToken(userData._id);

//       res.json({
//          success: true,
//          userData,
//          token,
//          message: "Login successful.",
//       });
//    } catch (error) {
//       console.log(error.message);
//       res.json({ success: false, message: error.message });
//    }
// };

// // Check if user is authenticated
// export const checkAuth = (req, res) => {
//    res.json({ success: true, user: req.user });
// };

// // Update user profile
// export const updateProfile = async (req, res) => {
//    try {
//       const { profilePic, bio, fullName } = req.body;
//       const userId = req.user._id;

//       let updatedUser;

//       if (!profilePic) {
//          updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { bio, fullName },
//             { new: true }
//          );
//       } else {
//          const upload = await cloudinary.uploader.upload(profilePic);
//          updatedUser = await User.findByIdAndUpdate(
//             userId,
//             {
//                profilePic: upload.secure_url,
//                bio,
//                fullName,
//             },
//             { new: true }
//          );
//       }

//       res.json({ success: true, user: updatedUser });
//    } catch (error) {
//       console.log(error.message);
//       res.json({ success: false, message: error.message });
//    }
// };
