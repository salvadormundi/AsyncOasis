import * as imgService from '../services/Image.MongoDB.service.js';

async function saveImage(req, res) {
  const { imageBase64, quality } = req.body;
  imgService
    .saveService(imageBase64, quality)
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.log(err);
      res.json({ success: false, error: err });
    });
}

async function deleteImage(req, res) {
  const imageId = req.params.id;
  if (imageId === undefined) {
    return res.sendStatus(400).json('bad request');
  }
  imgService
    .deleteService(imageId)
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.log(err);
      res.json({ success: false, error: err });
    });
}

async function updateImage(req, res) {
  const imageId = req.params.id;
  if (imageId === undefined) {
    return res.sendStatus(400).json('bad request');
  }
  await imgService.updateService(imageId, req.body.image);
  return res.json({ success: true });
}

async function getImage(req, res) {
  const imageId = req.params.id;
  return res.json({
    ...(await imgService.getService(imageId)),
  });
}

export { getImage, deleteImage, updateImage, saveImage };
