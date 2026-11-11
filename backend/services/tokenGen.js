import crypto from "crypto";

import { sendPasswordResetEmail } from "./nodemailer.js";
import passwordReset from "../models/forgotPassword.js";

export const tokenGen = async (forgetData) => {
    console.log("data 5")
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("data 6")
    const tokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    console.log("data 7")
    await passwordReset.create({
        userId: forgetData._id,
        tokenHash: tokenHash,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    console.log("data 8")
    const resetLink =
        `http://localhost:5173/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail(
        forgetData.email,
        resetLink)
    console.log("data 9")
    console.log(resetToken);

    return resetToken;
};