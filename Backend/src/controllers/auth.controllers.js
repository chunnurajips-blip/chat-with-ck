import { generateToken } from "../lib/utlis.js";
import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are Required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should  atleast 6 character" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please Enter a valid email " });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    // 12345 => #(^&(^%))jhfiuhgi*%^#
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generateToken(newUser._id, res);
      // await newUser.save();

      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user Data" });
    }
  } catch (error) {
    console.log("Error in signup controller ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  res.send("Login endpoint");
};

export const logout = async (req, res) => {
  res.send("Logout endpoint");
};
