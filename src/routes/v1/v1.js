import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { errorHandlerMiddleware } from '../../middleware/errorHandler.middleware.js';
import AuthRouter from './Auth.routes.js';

import ImageRouter from './Image.routes.js';

const v1Router = Router();

v1Router.use(
  '/auth',
  errorHandlerMiddleware,
  expressAsyncHandler(AuthRouter)
);
v1Router.use(
  '/image',
  errorHandlerMiddleware,
  expressAsyncHandler(ImageRouter)
);

export default v1Router;
