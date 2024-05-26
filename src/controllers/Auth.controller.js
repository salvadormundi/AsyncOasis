// Controllers: Controllers are responsible for handling incoming requests, interacting with models and services,
// and sending responses back to the client. They act as an intermediary between the client and the server-side logic.
// Controllers typically handle HTTP requests, validate user input, and call services or models to perform business logic.

// Services: Services, on the other hand, are reusable pieces of code that encapsulate specific business logic or functionality.
// They are often used to perform complex operations, interact with external systems, or provide utility functions.
// Services are typically called by controllers to perform specific tasks.

import { OtpModel } from '../models/Otp.model.js';
import {
  generateOtp,
  sendOtpValidation,
} from '../services/Auth.service.js';
import { sendResponse } from '../utils/Node.util.js';

export const sendOtp = async (req, res, next) => {
  const { email, phoneNumber } = req.query;
  const type = sendOtpValidation(email, phoneNumber);
  const query = {
    [type]: type === 'email' ? email : phoneNumber,
    otp: generateOtp(),
  };
  const otpModel = new OtpModel(query);
  await otpModel.save();

  sendResponse(res, 200, 'Otp sent successfully');
};

export const verifyOtp = async (req, res, next) => {
  const { email, phoneNumber, otp } = req.query;
  const type = verifyOtpValidation();
  const query = {
    [type]: type === 'email' ? email : phoneNumber,
    otp,
  };
  const verified = await OtpModel.findOne(query);
  if (verified) {
    sendResponse(res, 200, 'Otp verified successfully');
  } else {
    sendResponse(res, 406, 'Otp verified successfully');
  }
};
