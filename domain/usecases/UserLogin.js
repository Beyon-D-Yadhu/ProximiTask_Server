import User from '../entities/User.js';
import { comparePass } from '../../utils/comparePass.js';

class UserLogin {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, pass }) {
    const user = await this.userRepository.findUserByEmail(email);
    console.log(user)
    if (user && comparePass(pass,user.password)) {
      return user;
    }
    throw new Error('Invalid credentials');
  }
}

export default UserLogin;