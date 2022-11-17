import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const dealWesternSchema = new Schema({
  reference_number: { type: String, unique: true },
  successful: { type: Boolean },
  effective_date: { type: Date, default: new Date() },
  amount: { type: Number },
  balance: { type: Number },
  dues_number: { type: Number },
  fulfilled: { type: Boolean }
});

export default model('dealWestern', dealWesternSchema);