import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../domain/models/User";
import UserRepositoryImpl from "../../adapters/repositories/UserRepositoryImpl";

class AuthService {
  static async register(
    name: string,
    username: string,
    password: string,
    userType: string
  ) {
    const userRepository = new UserRepositoryImpl();
    let user = await userRepository.findByUsername(username);
    if (user) {
      throw new Error("User already exists");
    }
    user = new User({ name, username, password, userType });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await userRepository.save(user);
    const payload = { user: { id: user.id } };
    return jwt.sign(payload, "secret", { expiresIn: 360000 });
  }

  static async login(username: string, password: string) {
    const userRepository = new UserRepositoryImpl();
    let user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const payload = { user: { id: user.id } };
    return jwt.sign(payload, "secret", { expiresIn: 360000 });
  }
}

export default AuthService;
