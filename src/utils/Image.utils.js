import sharp from 'sharp';

/** @param {String} imgBase64: The base64 representation of the image
 * @param {Number} quality: The quality to store the image
 * @returns {Buffer}
 */
async function readImage(imgBase64, quality) {
  const imgBuffer = Buffer.from(imgBase64, 'base64');
  return sharp(imgBuffer)
    .jpeg({ quality: quality, mozjpeg: true })
    .toBuffer()
    .then(buff => buff)
    .catch(err => {
      console.log(err);
    });
}

/** @param {String} imgBase64: The base64 representation of the image
 * @returns {Promise<sharp.Metadata>}
 */
async function getImageMetadata(imgBase64) {
  const imgBuffer = Buffer.from(imgBase64, 'base64');
  return sharp(imgBuffer)
    .metadata()
    .then(metadata => metadata)
    .catch(err => {
      console.log(err);
    });
}

/** @param {String} imgBase64: The base64 representation of the image
 * @param {Number} width: The width of the image
 * @param {Number} height: The height of the image
 * @returns {Promise<Buffer>}
 */
async function getResizedImage(imgBase64, width, height) {
  return sharp(imgBase64)
    .resize(Math.trunc(width), Math.trunc(height), {
      fit: 'inside',
    })
    .toBuffer()
    .then(buff => buff)
    .catch(err => {
      console.log(err);
    });
}

export { readImage, getResizedImage, getImageMetadata };
