import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    imgId: { type: String, required: true, index: true },
  },
  { timestamps: true, collection: 'image' }
);

ImageSchema.index({ imgId: 1 });

export const ImageModel = mongoose.model(
  'Image',
  ImageSchema
);
