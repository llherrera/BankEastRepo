import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const cardSchema = new Schema({
  id_card: { type: Schema.Types.ObjectId, unique: true },
  owner: { type: String },
  owner_id: { type: Schema.Types.ObjectId },
  exp_month: { type: String },
  exp_year: { type: String },
  cvv: {type: Number},
  card_franchise_id: {type: Number},
  card_type_id: {type: Number},
  amount: {type: Number},
  card_number: {type: Number},
});

export default model('Card', cardSchema);