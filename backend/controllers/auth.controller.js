const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const nodemailer = require("nodemailer");

const otpStore = new Map();

const register = async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;

    if (!username || !email || !password || !profilePicture) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
      profilePicture,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", { email });

    const user = await User.findOne({ email }).select("+password"); // Explicitly include

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const me = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res
      .status(500)
      .json({ message: "Internal server error while fetching profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    if (updates.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updates.email)) {
        return res
          .status(400)
          .json({ message: "Please provide a valid email address" });
      }

      const existingUser = await User.findOne({ email: updates.email });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    if (updates.username && updates.username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long" });
    }

    if (updates.password) {
      if (updates.password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Update profile error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res
      .status(500)
      .json({ message: "Internal server error while updating profile" });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!req.user || req.user._id.toString() !== req.params.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this user" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res
      .status(500)
      .json({ message: "Internal server error while deleting user" });
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res
      .status(500)
      .json({ message: "Internal server error while fetching user" });
  }
};

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.verify();
  } catch (error) {
    console.error("Email transporter verification failed:", error);
    throw new Error("Email service configuration error");
  }

  await transporter.sendMail({
    from: `"Web Builder" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Email Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Web Builder Email Verification</h2>
        <p style="font-size: 16px; color: #666;">Your OTP for registration is:</p>
        <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px; text-align: center; padding: 20px;">${otp}</h1>
        <p style="font-size: 14px; color: #999;">This OTP will expire in 10 minutes.</p>
      </div>
    `,
  });
};

const sendVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);

    otpStore.set(email, {
      otp: hashedOTP,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    setTimeout(() => {
      otpStore.delete(email);
    }, 10 * 60 * 1000);

    await sendOTP(email, otp);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

const verifyAndRegister = async (req, res) => {
  try {
    const { username, email, password, profilePicture, otp } = req.body;

    const storedOTPData = otpStore.get(email);
    if (!storedOTPData || Date.now() > storedOTPData.expires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const isValidOTP = await bcrypt.compare(otp, storedOTPData.otp);
    if (!isValidOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = new User({
      username,
      email,
      password,
      profilePicture,
      isVerified: true,
    });

    await user.save();

    otpStore.delete(email);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

module.exports = {
  register,
  login,
  me,
  getProfile,
  updateProfile,
  deleteUser,
  getMe,
  sendVerificationOTP,
  verifyAndRegister,
};
