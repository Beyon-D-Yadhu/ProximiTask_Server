import UserModel from '../../infrastructure/db/mongoose.js';
import User from '../../domain/entities/User.js';

class UserRepository {
  async createUser(userDetails) {
    const user = new UserModel(userDetails);
    await user.save(); 
    return new User(user.toObject());
  }

  async findUserByEmail(email) {
    const user =await UserModel.findOne({ email });
    if(user){
       return new User(user.toObject());
    }
    return null
  }
}

export default UserRepository;