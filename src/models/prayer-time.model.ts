import mongoose, { Schema, Document } from 'mongoose';

export interface IPrayerTime extends Document {
  district_id: string;
  date: Date;
  hijri_date: {
    day: number;
    month: number;
    month_name: string;
    month_name_en: string;
    year: number;
    full_date: string;
  };
  times: {
    imsak: string;
    gunes: string;
    ogle: string;
    ikindi: string;
    aksam: string;
    yatsi: string;
  };
  meta: {
    source: string;
  };
}

const PrayerTimeSchema: Schema = new Schema({
  district_id: { 
    type: String, 
    required: true, 
    ref: 'District',
    index: true 
  },
  date: { 
    type: Date, 
    required: true,
    index: true 
  },
  hijri_date: {
    day: Number,
    month: Number,
    month_name: String,
    month_name_en: String,
    year: Number,
    full_date: String
  },
  times: {
    imsak: String,
    gunes: String,
    ogle: String,
    ikindi: String,
    aksam: String,
    yatsi: String
  },
  meta: {
    source: String
  }
}, { 
  collection: 'prayer_times',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false 
});

PrayerTimeSchema.index({ district_id: 1, date: 1 }, { unique: true });

export default mongoose.model<IPrayerTime>('PrayerTime', PrayerTimeSchema);