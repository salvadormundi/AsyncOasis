// Controllers: Controllers are responsible for handling incoming requests, interacting with models and services,
// and sending responses back to the client. They act as an intermediary between the client and the server-side logic.
// Controllers typically handle HTTP requests, validate user input, and call services or models to perform business logic.

// Services: Services, on the other hand, are reusable pieces of code that encapsulate specific business logic or functionality.
// They are often used to perform complex operations, interact with external systems, or provide utility functions.
// Services are typically called by controllers to perform specific tasks.

import { OtpModel } from '../models/Otp.model.js';
import {
  createUser,
  generateOtp,
  sendOtpValidation,
  verifyOtpValidation,
} from '../services/Auth.service.js';
import { sendResponse } from '../utils/Node.util.js';

export const sendOtp = async (req, res, next) => {
  try {
    const {
      email,
      phoneNumber,
      isSignup = false,
    } = req.query;
    const type = await sendOtpValidation(
      email,
      phoneNumber,
      isSignup
    );
    const otp = generateOtp();
    const query = {
      [type]: type === 'email' ? email : phoneNumber,
      otp,
    };
    const otpModel = new OtpModel(query);
    await otpModel.save();
    setTimeout(async () => {
      await otpModel.deleteOne({ otp });
    }, 300000);
    sendResponse(res, 200, 'Otp sent successfully');
  } catch (error) {
    sendResponse(res, 404, error.message);
  }
};

export const verifyOtp = async (req, res, next) => {
  const { email, phoneNumber, otp } = req.query;
  const type = verifyOtpValidation(email, phoneNumber, otp);
  const query = {
    [type]: type === 'email' ? email : phoneNumber,
    otp,
  };
  const verified = await OtpModel.findOne(query)
    .select({
      _id: 1,
    })
    .lean();
  if (verified?._id) {
    const { user, accessToken } = createUser(
      email,
      phoneNumber
    );
    sendResponse(
      res,
      200,
      'Otp verified successfully',
      {
        user,
      },
      null,
      { authorization: accessToken }
    );
  } else {
    sendResponse(res, 406, 'Otp invalid, please try again');
  }
};
