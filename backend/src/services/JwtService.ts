import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index";

// JWT (JSON Web Tokens) | header, payload, signature
// Example:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. // header (algorithm & token type)
// eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9. // payload (user id)
// TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ // signature (secret)

export interface AuthRequest extends Request {
  userId?: string;
}

export class JwtService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = config.JWT_SECRET;
    this.expiresIn = "1h";
  }

  // Create a token with the user id
  createToken(userId: string): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: this.expiresIn });
  }

  // Validate the token from the Authorization header
  validateToken = (
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
      const decoded = jwt.verify(token, config.JWT_SECRET) as {
        userId: string;
      };
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
}
