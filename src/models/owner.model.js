import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ownerWesternSchema = new Schema({
  id_owner: { type: Schema.Types.ObjectId, unique: true },
  name: { type: String },
  email: { type: String },
  DNI: { type: String }
});

export default model('OwnerWestern', ownerWesternSchema);