// import UserRepository from "../../interface/repositories/UserRepository.js"
// import otpService from "../../services/otpService.js"
// import client from "../../config/redisClient.js"

// async function InitialSignUp(userData){
//     const repo = new UserRepository()
//     const existingUser =await repo.findUserByEmail(userData.email)
//     if(existingUser){
//         return true
//     }
//     const otp = otpService()
//     const val = JSON.stringify(userData)
//     client.set('userData',val)
//     client.setEx('otp',300,otp)
//     return fasle
// }

// export default InitialSignUp

class InitialSignUp {
    constructor({ userRepository, otpService, redisClient }) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.redisClient = redisClient;
    }

    async execute(userData) {
        try {
            const existingUser = await this.userRepository.findUserByEmail(userData.email);
            if (existingUser) {
                return { success: false, message: "User already exists",status:409 };
            }
            console.log(userData)
            const otp = await this.otpService(userData.email)

            const userDataString = JSON.stringify(userData);

            await this.redisClient.set('userData', userDataString);
            await this.redisClient.setEx('otp', 300, otp);

            return { success: true, message: "OTP sent", otp ,status:200}; // Return otp for testing purposes, remove in production
        } catch (error) {
            // console.error('Error during sign-up process:', error);
            throw error
            // return { success: false, message: "An error occurred during sign-up",status:500 };
        }
    }
}

export default InitialSignUp;