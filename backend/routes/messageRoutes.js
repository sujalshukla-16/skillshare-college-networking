import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessages,
  getChatUsers,
  markAsRead,
  getUnreadCounts,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/chat-users", protect, getChatUsers);
router.get("/unread", protect, getUnreadCounts);
router.put("/read/:userId", protect, markAsRead);
router.get("/:userId", protect, getMessages);

export default router;
