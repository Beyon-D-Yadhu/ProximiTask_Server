import UserRepository from "../repositories/UserRepository.js";
import UserSignUp from "../../domain/usecases/UserSignUp.js";
import UserLogin from "../../domain/usecases/UserLogin.js";
import client from "../../config/redisClient.js";
import InitialSignUp from "../../domain/usecases/initiateUserSignUp.js";
import { trusted } from "mongoose";
import otpService from "../../services/otpService.js";
import bcrypt from 'bcryptjs'
import jwt from "../../utils/jwt.js";

const userRepository = new UserRepository();

const initiateRegistration = async (req, res) => {
  console.log("reached initialSignup, body=", req.body);
  //create a 4 digit otp. save user data temperarly in session
  const userData = req.body;
  
  const initialSignUp = new InitialSignUp({
    userRepository: new UserRepository(),
    otpService: otpService,
    redisClient: client,
    bcrypt
  });

  initialSignUp
    .execute(userData)
    .then((response) => {
      console.log('res = ',response);
      res.status(response.status).json({success:response.success, message:response.message})
    })
    .catch((error) => {
      console.error('error promise = ',error);
      res.status(500).json({error})
    });
};

const signUp = async (req, res) => {
  console.log('reached sign up');
  const otp = req.body.otp
  const cliOtp = await client.get('otp')
  const ttl = await client.ttl('otp')
  console.log(cliOtp,ttl)
  if(otp == cliOtp && ttl>0){
    const data = await client.get('userData')
    console.log('userData = ',data)
  const userSignUp = new UserSignUp(userRepository);
  try {
    const user = await userSignUp.execute(data);
    console.log('going to send response')
    res.status(201).json({ success: true });
    console.log('response send')
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
};

const login = async (req, res) => {
  console.log(req.body);
  const userLogin = new UserLogin(userRepository);
  try {
    const user = await userLogin.execute(req.body);
    console.log(user);
    const refreshToken = jwt.generateRefreshToken(req.body.email)
    const accessToken = jwt.generateAccessToken(req.body.email)
    console.log(`access token = ${accessToken}, refresh Token = ${refreshToken}`)
    res.status(200).json({ success: true, user: user, refreshToken, accessToken });
  } catch (error) {
    console.log('err:',error)
    res.status(400).json({ error: error.message });
  }
};

export { signUp, login, initiateRegistration };
