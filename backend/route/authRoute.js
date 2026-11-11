import express from "express";
import { register,loginUser, getauthData, logoutUser } from "../controller/authUse.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { forgotpassword, passwordResetData } from "../controller/forgotData.js";
import { forgotPasswordLimiter } from "../middleware/forgotPasswordLimiter .js";
import { adminexploreIdeas, createIdeas, deletefetechData, deleteform, exploreIdeas, fetchData, formData, generateIdeas, getAuthProfile, getMessage, message, updateIdeaStatus, updateProfile } from "../controller/profile.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/profile", authMiddleware,getauthData);
router.post("/logout",authMiddleware, logoutUser);
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotpassword
);
router.patch(
  "/updateIdeaStatus",
  authMiddleware,

 updateIdeaStatus
);
router.get("/adminexploreIdeas", adminexploreIdeas);
router.delete("/deleteformData",authMiddleware,deleteform);
router.get("/exploreIdeas",authMiddleware,exploreIdeas);
router.get("/getUserProfile", authMiddleware, getAuthProfile)
router.get("/data", fetchData)
router.delete("/datadelete", deletefetechData)
router.patch("/update-password", passwordResetData);
router.put("/updateProfile", authMiddleware, updateProfile);
router.get("/getMessage", authMiddleware, getMessage);
router.put("/formData", formData);
router.post("/submitIdeas", authMiddleware, createIdeas);
router.post("/message", authMiddleware, message);
router.post("/generate", generateIdeas);
export default router;