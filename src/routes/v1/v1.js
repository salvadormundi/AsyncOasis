import { Router } from "express";
import AuthRouter from "./Auth.routes.js";
import expressAsyncHandler from "express-async-handler";

const v1Router = Router();

v1Router.use('/auth',expressAsyncHandler(AuthRouter));

export default v1Router;