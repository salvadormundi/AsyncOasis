import crypto from 'crypto';
import {
  validateEmail,
  validatePhoneNumber,
} from '../utils/Validation.util.js';
import { UserModel } from '../models/User.model.js';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET_KEY;

/**
 * Description placeholder
 *
 * @returns {*}
 */
export const generateOtp = () => {
  return crypto
    .randomInt(0, 100000)
    .toString()
    .padStart(5, '0');
};

/**
 * Description placeholder
 *
 * @async
 * @param {*} email
 * @param {*} phoneNumber
 * @returns {*}
 */
export const checkIsSignedIn = async (
  email,
  phoneNumber
) => {
  const query = {
    [email ? 'email' : 'phoneNumber']: email
      ? email
      : phoneNumber,
  };
  const data = await UserModel.findOne(query);
  if (data?._id) {
    throw new Error(
      `Already hava an account with this ${
        email ? 'email' : 'phone number'
      }, please signin`
    );
  }
};

/**
 * Description placeholder
 *
 * @async
 * @param {*} email
 * @param {*} phoneNumber
 * @param {*} isSignup
 * @returns {unknown}
 */
export const sendOtpValidation = async (
  email,
  phoneNumber,
  isSignup
) => {
  if (!email && !phoneNumber) {
    throw new Error('Email or phone number is required');
  }
  if (email) {
    validateEmail(email);
    if (isSignup) {
      await checkIsSignedIn(email, phoneNumber);
    }
    return 'email';
  } else {
    validatePhoneNumber(phoneNumber);
    if (isSignup) {
      await checkIsSignedIn(email, phoneNumber);
    }
    return 'phoneNumber';
  }
};

/**
 * Description placeholder
 *
 * @param {*} email
 * @param {*} phoneNumber
 * @param {*} otp
 * @returns {("email" | "phoneNumber")}
 */
export const verifyOtpValidation = (
  email,
  phoneNumber,
  otp
) => {
  if (!email && !phoneNumber) {
    throw new Error('Email or phone number is required');
  }

  if (!otp.length === 5) throw new Error('Otp is required');

  return email ? 'email' : 'phoneNumber';
};

/**
 * Description placeholder
 *
 * @async
 * @param {*} email
 * @param {*} phoneNumber
 * @returns {*}
 */
export const createUser = async (email, phoneNumber) => {
  const newUser = new UserModel({
    [email ? 'email' : 'phoneNumber']: email
      ? email
      : phoneNumber,
  });

  const data = await newUser.save();
  const token = jwt.sign(
    {
      _id: data?._id,
    },
    secret
  );
  if (data) {
    return { data, token };
  } else {
    throw new Error('Failed to login');
  }
};
