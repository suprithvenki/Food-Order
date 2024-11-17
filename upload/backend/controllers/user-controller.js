import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received with:", email, password);

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    // Check if password field exists
    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "Server error: password missing in user record",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Create a token and send the response
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email format and password strength
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { loginUser, registerUser };
