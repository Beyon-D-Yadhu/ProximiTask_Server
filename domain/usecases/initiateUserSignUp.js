import UserRepository from "../../interface/repositories/UserRepository"
import otpService from "../../services/otpService"
import client from "../../config/redisClient"

async function InitialSignUp(userData){
    const repo = new UserRepository()
    const existingUser =await repo.findUserByEmail(userData.email)
    if(existingUser){
        return false
    }
    const otp = otpService()
    const val = JSON.stringify(userData)
    client.set('userData',val)
    client.setEx('otp',300,otp)
    return
}

export default InitialSignUp