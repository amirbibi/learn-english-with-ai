import User from "../models/UserModel";

export class AuthRepository {
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

  async updateUserGoogleId(user: any, googleId: string): Promise<any> {
    user.googleId = googleId;
    return user.save();
  }
}
