import User from "../../domain/models/User";
import { UserInterface } from "../../infrastructure/types/index";
import UserRepository from "../../domain/repositories/UserRepository";

class UserRepositoryImpl extends UserRepository {
  async findByUsername(username: string): Promise<UserInterface | null> {
    return await User.findOne({ username });
  }

  async save(user: UserInterface): Promise<UserInterface> {
     const newUser = new User(user);
     return await newUser.save();
  }
}

export default UserRepositoryImpl;
