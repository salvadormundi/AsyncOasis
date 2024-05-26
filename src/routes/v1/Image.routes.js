import * as imgController from '../../controllers/Image.controller.js';
import { Router } from 'express';

const ImageRouter = Router();

ImageRouter.route('/get').get(imgController.getImage);
ImageRouter.route('/post').post(imgController.saveImage);
ImageRouter.route('/update').put(imgController.updateImage);
ImageRouter.route('/delete').delete(
  imgController.deleteImage
);

export default ImageRouter;
