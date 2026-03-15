import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
{
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  company: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  lastDate: {
    type: Date,
    required: true,
  },

  stipend: {
    type: String,
  },

  description: {
    type: String,
  },

  applyLink: {
    type: String,
    required: true,
  }

},
{ timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);
