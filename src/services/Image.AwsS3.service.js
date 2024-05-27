import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import 'dotenv/config';
import stream from 'stream';
import { v4 as uuidv4 } from 'uuid';
import {
  getImageMetadata,
  getResizedImage,
  readImage,
} from '../utils/Image.utils.js';
import { ImageModel } from '../models/Image.model.js';

const awsRegion = 'ap-south-1';
const s3Bucket = 'photobucket.asyncoasis';

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
  region: awsRegion,
});

async function getS3Bucket() {
  return 'photobucket.asyncoasis';
}

/**
 *
 * @param {String} image: The base64 string of the image
 * @param {Number} quality: The jpeg quality of the saved image
 */
async function saveService(image, quality) {
  const imgId = uuidv4({});
  new Upload({
    client: client,
    params: {
      Bucket: await getS3Bucket(),
      Key: `${imgId}.jpg`,
      Body: await readImage(image, quality),
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    },
    queueSize: 4,
  })
    .done()
    .then(() => {
      console.log(
        `image saved to ${s3Bucket} with id: ${imgId}`
      );
      new ImageModel({ imgId: imgId })
        .save()
        .then(() => console.log(`imgId: ${imgId} saved`))
        .catch(err => console.error(err));
    })
    .catch(err => {
      console.error(err);
    });
}

/**
 *
 * @param {String} imgId: the uuidv4 id of the image
 * @param {number} resizeFactor: The factor to resize the image[0-1]
 */
async function getService(imgId, resizeFactor = 1) {
  try {
    const response = await client.send(
      new GetObjectCommand({
        Bucket: await getS3Bucket(),
        Key: `${imgId}.jpg`,
      })
    );
    const imgBase64 = await response.Body.transformToString(
      'base64'
    );
    console.log(imgBase64);
    const metadata = await getImageMetadata(imgBase64);
    const width = metadata.width;
    const height = metadata.height;
    const resizedImg = await getResizedImage(
      imgBase64,
      width * resizeFactor,
      height * resizeFactor
    );
    return resizedImg.toString('base64');
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @param {string} imgId: The uuidv4 key of the image
 * @param {string} newImg: The base64 encoded string of the image
 */
async function updateService(imgId, newImg) {
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: await getS3Bucket(),
        Key: `${imgId}.jpg`,
        Body: stream.Readable.from(newImg, {
          encoding: 'base64',
        }),
      })
    );
    console.log(`image updated at id: ${imgId}`);
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @param {string} imgId: The uuidv4 key of the image
 */
async function deleteService(imgId) {
  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: await getS3Bucket(),
        Key: `${imgId}.jpg`,
      })
    );
    console.log(`image deleted at id: ${imgId}`);
  } catch (err) {
    console.error(err);
  }
}

export {
  saveService,
  updateService,
  deleteService,
  getService,
};
