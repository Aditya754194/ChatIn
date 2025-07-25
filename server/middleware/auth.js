import User from "../models/User.js";
import jwt from "jsonwebtoken";


//middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) return res.json({success: false, message: "User not found"});

        req.user = user;
        next();

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}



// export const protectRoute = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1]; // Bearer <token>
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     next();

//   } catch (error) {
//     console.error("Auth Middleware Error:", error.message);
//     res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };
