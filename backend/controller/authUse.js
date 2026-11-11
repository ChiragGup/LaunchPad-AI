import userCollection from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginHistory, logoutHistory } from "../services/authHistory.js";

export const register = async (req, res) => {
  try {

    // Get data from frontend
    const { fullName, email, password } = req.body;
console.log("step 1")
    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
console.log("step 2")
    // Check if email already exists
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
console.log("step 3")
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
console.log("step 4")
    // Create new user
    const newUser = await userCollection.create({
      fullName,
      email,
      password: hashedPassword,
    });
    console.log("step 5")
    console.log("User Created:", newUser);

    // Success response
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.log("step 6")
    console.log(error);         
    console.log(error.message); 
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    // Get data from frontend
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user exists
    const dataLogin = await userCollection.findOne({ email });

    if (!dataLogin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      dataLogin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
    {
        id: dataLogin._id,
        email: dataLogin.email,
          role: dataLogin.role,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d",
    }
);
 console.log("token:",req.cookies.token);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

loginHistory(dataLogin._id)
// Login successful
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: dataLogin._id,
        fullName: dataLogin.fullName,
        email: dataLogin.email,
        role: dataLogin.role,
      },
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

};
export const getauthData = async (req, res) => {
  try {
    const userId = req.user.id;

    const userLoginData = await userCollection.findById(userId);

    if (!userLoginData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: userLoginData._id,
        fullName: userLoginData.fullName,
        email: userLoginData.email,
        role: userLoginData.role
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } 
};

export const logoutUser = async (req, res) => {
  try {
       console.log("User data:", req.user);
    console.log("Logout started");

    const userId = req.user.id;
  
  
    console.log("User ID:", userId);

    const token = req.cookies.token;
    console.log("Token exists:", !!token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is already logged out",
      });
    }

    console.log("Calling logoutHistory...");

    await logoutHistory(userId);

    console.log("logoutHistory completed");

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    console.log("Cookie cleared");

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    console.log("LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};