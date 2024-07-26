import User from "../models/User";
import { OAuth2Client } from "google-auth-library";
import config from "../config/index";

export class AuthRepository {
  private googleClient: OAuth2Client;

  constructor() {
    // Create a new OAuth2Client instance
    this.googleClient = new OAuth2Client(
      config.GOOGLE_CLIENT_ID,
      config.GOOGLE_CLIENT_SECRET,
      config.GOOGLE_REDIRECT_URI
    );
  }

  async findUserByEmail(email: string): Promise<any> {
    return User.findOne({ email });
  }

  async createUser(userData: {
    email: string;
    password: string;
    googleId?: string;
  }): Promise<any> {
    const user = new User(userData);
    return user.save();
  }

  async findUserById(userId: string): Promise<any> {
    return User.findById(userId);
  }

  // Verify the Google token and return the email and Google ID
  async verifyGoogleToken(
    code: string
  ): Promise<{ email: string; googleId: string }> {
    const { tokens } = await this.googleClient.getToken(code);
    const ticket = await this.googleClient.verifyIdToken({
      idToken: tokens.id_token!,
      audience: config.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error("Unable to verify Google token");
    }

    return { email: payload.email, googleId: payload.sub };
  }

  // Update the user with the Google ID (for users who first signed up with email and password)
  async updateUserGoogleId(user: any, googleId: string): Promise<any> {
    user.googleId = googleId;
    return user.save();
  }
}
