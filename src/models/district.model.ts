import mongoose, { Schema, Document } from 'mongoose';

export interface IDistrict extends Document {
  _id: string;
  name: string;
  name_en: string;
  url: string;
  state_id: string;
  country_id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone?: string;
  gmt_offset: string;
}

const DistrictSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, index: true },
  name_en: { type: String, index: true },
  url: { type: String, required: true },
  state_id: { type: String, required: true, ref: 'State', index: true },
  country_id: { type: String, required: true, ref: 'Country', index: true },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  timezone: String,
  gmt_offset: { type: String, required: true }
}, { 
  _id: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false 
});

DistrictSchema.index({ name: 'text', name_en: 'text' });

export default mongoose.model<IDistrict>('District', DistrictSchema);