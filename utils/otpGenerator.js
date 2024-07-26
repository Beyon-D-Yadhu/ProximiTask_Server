// src/utils/otpGenerator.js
import { generate } from 'otp-generator';

function generateOTP() {
//   return generate(6, { upperCaseAlphabets: false, specialChars: false });
return generate(4,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
}

export default generateOTP;
