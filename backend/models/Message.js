import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
{
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  read: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    required: true,
  },
},
{ timestamps: true }
);

export default mongoose.model("Message", messageSchema);
