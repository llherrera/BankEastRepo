import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const dealSchema = new Schema({
  reference_number: { type: String }
});

export default model('deal', dealSchema);