import UserModel from '../../infrastructure/db/mongoose.js';
import User from '../../domain/entities/User.js';

class UserRepository {

  async createUser(userDetails) {
    console.log('details = ', userDetails)
    const data = JSON.parse(userDetails)
    const user = new UserModel(data)
    console.log('user = ',user)
    await user.save(); 
    return user
  }

  async findUserByEmail(email) {
    const user =await UserModel.findOne({ email });
    if(user){
       return new User(user.toObject());
    }
    return nullg
  }
}

export default UserRepository;