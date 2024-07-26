// src/services/otpService.js
import { createTransport } from 'nodemailer';
import generateOTP from '../utils/otpGenerator';

// Configure your email service
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendOTP(email) {
  const otp = generateOTP();
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
    
  };

  try {
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
}

export default { sendOTP };
