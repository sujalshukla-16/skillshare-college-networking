import express from "express";
import protect from "../middleware/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import { markAsRead, getUnreadCounts } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:userId", protect, getMessages);
router.get("/chat-users", protect, getChatUsers);
router.put("/read/:userId", protect, markAsRead);
router.get("/unread", protect, getUnreadCounts);

export default router;
