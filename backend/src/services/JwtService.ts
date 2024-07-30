import jwt from "jsonwebtoken";
import config from "../config/index";

export class JwtService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = config.JWT_SECRET;
    this.expiresIn = "1h";
  }

  createToken(userId: string): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, this.secret) as { userId: string };
    } catch (error) {
      return null;
    }
  }
}
