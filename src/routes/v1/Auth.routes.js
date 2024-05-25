import { Router } from "express";
import { sendOtp, verifyOtp } from "../../controllers/Auth.controller.js";

const AuthRouter = Router();

AuthRouter.route("/send_otp").get(sendOtp);
AuthRouter.route("/verify_otp").get(verifyOtp);

export default AuthRouter;
