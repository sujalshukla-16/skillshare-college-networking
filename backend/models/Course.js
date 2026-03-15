import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
{
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  courseName: {
    type: String,
    required: true,
  },

  domain: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  eligibleStudents: {
    type: String, // BE / BSc / All students
    required: true,
  },

  lastDate: {
    type: Date,
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

export default mongoose.model("Course", courseSchema);
