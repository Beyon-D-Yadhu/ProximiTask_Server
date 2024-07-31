import jwt from 'jsonwebtoken';
const { sign, verify } = jwt

const generateAccessToken = (email) => {
  return sign({email:email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
};

const generateRefreshToken = (email) => {
  return sign({email:email}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
};

const verifyToken = (token, secret) => {
  return verify(token, secret);
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
