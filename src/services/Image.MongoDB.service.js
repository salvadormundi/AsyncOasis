import { ImageModel } from '../models/Image.model.js';
import {
  getImageMetadata,
  getResizedImage,
  readImage,
} from '../utils/Image.utils.js';

/**
 *
 * @param {String} image
 * @param {Number} quality
 */
async function saveService(image, quality) {
  const imagebuff = readImage(image, quality);
  return ImageModel.create({
    imageBase64: imagebuff.toString('base64'),
  });
}

/**
 *
 * @param {String} imgId
 */
async function deleteService(imgId) {
  return ImageModel.deleteOne({ _id: imgId });
}

/**
 *
 * @param {String} imgId
 * @param {String} imgBase64
 */
async function updateService(imgId, imgBase64) {
  return ImageModel.updateOne({
    _id: imgId,
    imageBase64: imgBase64,
  });
}

/**
 *
 * @param {Number} imgId
 */
async function getService(imgId) {
  if (imgId === undefined) {
    return ImageModel.find();
  }
  return ImageModel.findOne({ _id: imgId });
}

export {
  saveService,
  updateService,
  deleteService,
  getService,
};
