import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index";

export interface AuthRequest extends Request {
  userId?: string;
}

// Validate JWT token
export const validateJwtToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ message: "Invalid authorization format" });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token has expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
