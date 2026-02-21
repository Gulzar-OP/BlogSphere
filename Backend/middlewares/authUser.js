import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (...roles) => {
    return (req, res, next) => {

        // req.user exist check
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found"
            });
        }

        // admin role check
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "User is not authorized to access this route"
            });
        }

        next();
    };
};
