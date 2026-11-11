import userCollection from "../models/user.js";
import passwordReset from "../models/forgotPassword.js";
import { tokenGen } from "../services/tokenGen.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("data 1")

    const forgetData = await userCollection.findOne({ email });
    console.log("data 2")
    if (!forgetData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
 console.log("data 3")
    await tokenGen(forgetData);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully",
    });
  

  } catch (error) {
     console.log("data 4")
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const passwordResetData = async (req, res) => {
  try {
    const { password, forgetToken } = req.body;

    // 1. Check required data
    if (!password || !forgetToken) {
      return res.status(400).json({
        success: false,
        message: "Password and token are required",
      });
    }

    // 2. Hash the token received from frontend
    const token = crypto
      .createHash("sha256")
      .update(forgetToken)
      .digest("hex");

    // 3. Find the matching reset record
    const tokenData = await passwordReset.findOne({
      tokenHash: token,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    // 4. Check token
    if (!tokenData) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 5. Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Update the user's password
    await userCollection.findByIdAndUpdate(
      tokenData.userId,
      {
        password: hashedPassword,
      }
    );

    // 7. Make token unusable
    tokenData.used = true;
    await tokenData.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};