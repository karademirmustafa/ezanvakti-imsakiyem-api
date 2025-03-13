import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  timestamp: Date;
  correlationId?: string;
  requestId?: string;
  method?: string;
  url?: string;
  query?: Record<string, any>;
  params?: Record<string, any>;
  responseCode?: number;
  responseTime?: number;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
  contentLength?: string;
  level: string;
  message: string;
  error?: {
    name?: string;
    stack?: string;
    message?: string;
  };
}

const logSchema: Schema = new Schema(
  {
    timestamp: { type: Date, required: true },
    correlationId: { type: String },
    requestId: { type: String },
    method: { type: String },
    url: { type: String },
    query: { type: Object },
    params: { type: Object },
    responseCode: { type: Number },
    responseTime: { type: Number },
    userAgent: { type: String },
    ipAddress: { type: String },
    referrer: { type: String },
    contentLength: { type: String },
    level: { type: String, required: true },
    message: { type: String, required: true },
    error: {
      name: { type: String },
      stack: { type: String },
      message: { type: String },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

export default mongoose.model<ILog>("Log", logSchema);
