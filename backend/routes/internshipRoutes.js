import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createInternship,
  getInternships,
} from "../controllers/internshipController.js";

const router = express.Router();

// Get all internships
router.get("/", protect, getInternships);

// Add internship (only faculty/alumni allowed inside controller)
router.post("/", protect, createInternship);

export default router;
