import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const dealWesternSchema = new Schema({
  reference_number: { type: String }
});

export default model('dealWestern', dealWesternSchema);