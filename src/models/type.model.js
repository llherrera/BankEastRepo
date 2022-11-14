import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const typeSchema = new Schema({
  id_type: { type: Number, unique: true },
  type: { type: String }
});

export default model('Card_Type', typeSchema);