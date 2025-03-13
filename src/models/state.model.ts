import mongoose, { Schema, Document } from 'mongoose';

export interface IState extends Document {
  _id: string;
  name: string;
  name_en: string;
  country_id: string;
  timezone?: string;
}

const StateSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, index: true },
  name_en: { type: String, index: true },
  country_id: { type: String, required: true, ref: 'Country', index: true },
  timezone: String
}, { 
  _id: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false 
});

export default mongoose.model<IState>('State', StateSchema);