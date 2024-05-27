import * as imgService from '../services/Image.AwsS3.service.js';

async function saveImage(req, res) {
  const { image, quality } = req.body;
  if (
    req.body.image === undefined ||
    req.body.quality === undefined
  ) {
    return res.sendStatus(400).json('bad request');
  }
  imgService
    .saveService(image, quality)
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.log(err.stack);
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
      console.log(err.stack);
      res.json({ success: false, error: err });
    });
}

async function updateImage(req, res) {
  const imageId = req.params.id;
  if (imageId === undefined) {
    return res.sendStatus(400).json('bad request');
  }
  imgService
    .updateService(imageId, req.body.image)
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.log(err.stack);
      res.json({ success: false, error: err });
    });
}

async function getImage(req, res) {
  const imageId = req.params.id;
  if (imageId === undefined) {
    return res.sendStatus(400).json('bad request');
  }
  const resizeFac = req.query.resize;
  imgService
    .getService(imageId, resizeFac)
    .then(img => res.json({ success: true, image: img }))
    .catch(err => {
      console.log(err.stack);
      res.json({ success: false, error: err });
    });
}

export { getImage, deleteImage, updateImage, saveImage };
