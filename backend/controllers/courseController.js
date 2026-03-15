import Course from "../models/Course.js";

// ================= CREATE COURSE =================
export const createCourse = async (req, res) => {
  try {

    // Only faculty or alumni can add courses
    if (req.user.role !== "faculty" && req.user.role !== "alumni") {
      return res.status(403).json({ message: "Only faculty or alumni can add courses" });
    }

    const {
      courseName,
      domain,
      duration,
      eligibleStudents,
      lastDate,
      description,
      applyLink,
    } = req.body;

    const course = await Course.create({
      postedBy: req.user._id,
      courseName,
      domain,
      duration,
      eligibleStudents,
      lastDate,
      description,
      applyLink,
    });

    res.status(201).json(course);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL COURSES =================
export const getCourses = async (req, res) => {
  try {

    const courses = await Course.find()
      .populate("postedBy", "name role")
      .sort({ createdAt: -1 });

    res.json(courses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
