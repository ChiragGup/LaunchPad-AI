import rateLimit from "express-rate-limit";

export const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
     message: "You have tried too many times. Please try again after one hour.",
  },
});