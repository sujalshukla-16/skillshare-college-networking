import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createCourse,
  getCourses,
} from "../controllers/courseController.js";

const router = express.Router();

// Get all courses
router.get("/", protect, getCourses);

// Add new course (only faculty/alumni allowed inside controller)
router.post("/", protect, createCourse);

export default router;
