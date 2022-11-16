import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const cardWesternSchema = new Schema({
  id_card: { type: String, unique: true },
  owner: { type: String },
  owner_id: { type: String },
  exp_month: { type: String },
  exp_year: { type: String },
  cvv: {type: String},
  card_franchise_id: {type: Number},
  card_type_id: {type: Number},
  amount: {type: Number},
  card_number: {type: Number},
});

export default model('CardWestern', cardWesternSchema);