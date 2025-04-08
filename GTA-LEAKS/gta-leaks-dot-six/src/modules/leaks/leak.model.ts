import mongoose, { Document, Schema } from "mongoose";

export interface ILeak extends Document {
  title: string;
  description: string;
  img: string;
  createdAt: Date;
}

const LeakSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Leak = mongoose.model<ILeak>("Leak", LeakSchema);
export default Leak;
