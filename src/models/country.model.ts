import mongoose, { Schema, Document } from 'mongoose';

export interface ICountry extends Document {
  _id: string;
  name: string;
  name_en: string;
  timezone: string;
}

const CountrySchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, index: true },
  name_en: { type: String, index: true },
  timezone: String
}, { 
  _id: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false 
});

export default mongoose.model<ICountry>('Country', CountrySchema);