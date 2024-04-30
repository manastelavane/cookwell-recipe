import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  message: { type: String, required: true },
  username: { type: String, required: true },
  room: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
