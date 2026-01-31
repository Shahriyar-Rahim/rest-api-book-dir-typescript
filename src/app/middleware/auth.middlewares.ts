import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { User } from "../modules/auth/user.model.js";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - no token" });
        }
        // decode token and verify
        const decoded = jwt.verify(token, config.jwt_secret as string, { algorithms: ["HS256"] }) as { userId: string; role: string };
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - user not found" });
        }
        req.user = {
            _id: user._id,
            role: user.role
        };

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export const authorizeRoles = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if(req.user?.role !== "admin") {
        return res.status(403).json({ message: "Forbidden - you do not have permission to access this resource" });
    }
    
    next();
}