import crypto from 'crypto';
import {
  validateEmail,
  validatePhoneNumber,
} from '../utils/Validation.util.js';

export const generateOtp = () => {
  return crypto
    .randomInt(0, 100000)
    .toString()
    .padStart(5, '0');
};

export const sendOtpValidation = (email, phoneNumber) => {
  if (!email && !phoneNumber) {
    throw new Error('Email or phone number is required');
  }
  if (email) {
    validateEmail(email);
    return 'email';
  } else {
    validatePhoneNumber(phoneNumber);
    return 'phoneNumber';
  }
};

export const verifyOtpValidation = (
  email,
  phoneNumber,
  otp
) => {
  if (!email && !phoneNumber) {
    throw new Error('Email or phone number is required');
  }

  if (!otp.lenght === 5) throw new Error('Otp is required');

  return email ? 'email' : 'phoneNumber';
};
