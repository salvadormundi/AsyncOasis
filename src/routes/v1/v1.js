import { Router } from 'express';
import AuthRouter from './Auth.routes.js';
import expressAsyncHandler from 'express-async-handler';
import ImageRouter from './Image.routes.js';

const v1Router = Router();

v1Router.use('/auth', expressAsyncHandler(AuthRouter));
v1Router.use('/image', expressAsyncHandler(ImageRouter));

export default v1Router;
