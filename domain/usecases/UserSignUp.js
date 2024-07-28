import User from '../entities/User.js';

class UserSignUp {
  constructor(userRepository) {
    this.userRepository = userRepository
  } 


  async execute(userDetails) {
    // Add validation logic if necessary
    const user = await this.userRepository.createUser(userDetails);
    console.log('user = ',user)
    return new User(user);
  }
}

export default UserSignUp;
