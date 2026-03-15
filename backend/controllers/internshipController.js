import Internship from "../models/Internship.js";

// ================= CREATE INTERNSHIP =================
export const createInternship = async (req, res) => {
  try {

    // Only faculty or alumni can add internships
    if (req.user.role !== "faculty" && req.user.role !== "alumni") {
      return res.status(403).json({ message: "Only faculty or alumni can add internships" });
    }

    const {
      company,
      duration,
      lastDate,
      stipend,
      description,
      applyLink,
    } = req.body;

    const internship = await Internship.create({
      postedBy: req.user._id,
      company,
      duration,
      lastDate,
      stipend,
      description,
      applyLink,
    });

    res.status(201).json(internship);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL INTERNSHIPS =================
export const getInternships = async (req, res) => {
  try {

    const internships = await Internship.find()
      .populate("postedBy", "name role")
      .sort({ createdAt: -1 });

    res.json(internships);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
