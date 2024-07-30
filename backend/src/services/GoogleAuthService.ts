import { OAuth2Client } from "google-auth-library";
import config from "../config/index";

export class GoogleAuthService {
  private googleClient: OAuth2Client;

  constructor() {
    this.googleClient = new OAuth2Client(
      config.GOOGLE_CLIENT_ID,
      config.GOOGLE_CLIENT_SECRET,
      config.GOOGLE_REDIRECT_URI
    );
  }

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

    return { email: payload.email, googleId: payload.sub! };
  }
}
