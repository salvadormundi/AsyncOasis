import * as imgController from '../../controllers/Image.controller.js';
import { Router } from 'express';

const ImageRouter = Router();

ImageRouter.route('/get/:id').get(imgController.getImage);
ImageRouter.route('/post').post(imgController.saveImage);
ImageRouter.route('/update/:id').put(imgController.updateImage);
ImageRouter.route('/delete/:id').delete(
  imgController.deleteImage
);

export default ImageRouter;
