import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  message: { type: String, required: true },
  username: { type: String, required: true },
  room: { type: String, required: true },
});

export default mongoose.model("Message", messageSchema);
