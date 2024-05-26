import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    imageBase64: { type: String, index: true },
  },
  { timestamps: true, collection: 'image' }
);

ImageSchema.post('save', () => console.log('Image Saved'));

export const ImageModel = mongoose.model(
  'Image',
  ImageSchema
);
