import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; // 🔥 NEW IMPORT

import {
  createPost,
  getPosts,
  toggleLike,
  addComment,
} from "../controllers/postController.js";

const router = express.Router();

// ================= CREATE POST =================
// Now supports text + image + pdf
router.post("/", protect, upload.single("file"), createPost);

router.get("/", protect, getPosts);

router.put("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, addComment);

export default router;
