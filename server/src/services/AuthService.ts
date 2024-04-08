import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel';
import { RegisterResponse, LoginResponse, IUser } from '../interfaces/Interfaces';

const authService = {
  register: async (username: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      return { success: true, message: 'User registered successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const user: IUser | null = await User.findOne({ email });
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, message: 'Incorrect password' };
      }
      const payload = { userId: user._id, role: user.role };
      const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
      return { success: true, token };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
};

export default authService;
