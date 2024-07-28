// src/services/otpService.js
import { createTransport } from 'nodemailer';
import generateOTP from '../utils/otpGenerator.js';

// Email configuration
async function sendOTP(email) {

  const transporter = createTransport({
    service : 'gmail',
    secure:true,
    port:465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  const otp = generateOTP();
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Welcome to ProximiTask',
    text: `Your OTP code is ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions)
    return otp;
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
}

export default  sendOTP
