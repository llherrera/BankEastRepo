import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const franchiseSchema = new Schema({
  id_franchise: { type: Number, unique: true },
  franchise: { type: String }
});

export default model('Card_Franchise', franchiseSchema);