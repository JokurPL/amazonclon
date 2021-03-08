import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

const Device = mongoose.model("Device", deviceSchema);

export default Device;
