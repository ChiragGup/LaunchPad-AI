
import userCollection from "../models/user.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userCollection.findById(req.user.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization check failed",
    });
  }
};

export default adminMiddleware;
