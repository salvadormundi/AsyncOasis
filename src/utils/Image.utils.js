import sharp from 'sharp';

/** @param {String} imgBase64: The base64 representation of the image
 * @param {Number} quality: The quality to store the image
 */
async function readImage(imgBase64, quality) {
  const imgBuffer = Buffer.from(
    imgBase64.split(',').pop(),
    'base64'
  );
  return sharp(imgBuffer)
    .jpeg({ quality: quality, mozjpeg: true })
    .toBuffer();
}

/** @param {String} imgBase64: The base64 representation of the image
 */
async function getImageMetadata(imgBase64) {
  const imgBuffer = Buffer.from(imgBase64, 'base64');
  return sharp(imgBuffer).metadata();
}

/** @param {String} imgBase64: The base64 representation of the image
 * @param {Number} width: The width of the image
 * @param {Number} height: The height of the image
 */
async function getResizedImage(imgBase64, width, height) {
  const imgBuffer = Buffer.from(imgBase64, 'base64');
  return sharp(imgBuffer)
    .resize(Math.trunc(width), Math.trunc(height), {
      fit: 'inside',
    })
    .toBuffer();
}

export { readImage, getResizedImage, getImageMetadata };
