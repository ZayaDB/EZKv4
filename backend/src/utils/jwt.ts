import jwt, { SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  role: string;
  email: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  };
  return jwt.sign(payload, secret, options);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }
  const options: SignOptions = {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  };
  return jwt.sign(payload, secret, options);
};

export const verifyAccessToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.verify(token, secret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }
  return jwt.verify(token, secret) as TokenPayload;
};

