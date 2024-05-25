// Controllers: Controllers are responsible for handling incoming requests, interacting with models and services, 
// and sending responses back to the client. They act as an intermediary between the client and the server-side logic. 
// Controllers typically handle HTTP requests, validate user input, and call services or models to perform business logic.

// Services: Services, on the other hand, are reusable pieces of code that encapsulate specific business logic or functionality. 
// They are often used to perform complex operations, interact with external systems, or provide utility functions. 
// Services are typically called by controllers to perform specific tasks.

import { OtpModel } from "../models/Otp.model.js";
import { generateOtp } from "../services/Auth.service.js";

export const sendOtp = async (req, res, next) => {
  const { email, phoneNumber } = req.query;
  const otp =  generateOtp()
  if (email) {
    const otpModel = new OtpModel({
      email,
      otp,
    });
    await otpModel.save();
  } else {
    const otpModel = new OtpModel({
      phoneNumber,
      otp,
    });
    await otpModel.save();
  }
  res.json(`hello ${otp}`);
};

export const verifyOtp = async (req, res, next) => {};
