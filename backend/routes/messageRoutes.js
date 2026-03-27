import express from "express";
import protect from "../middleware/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:userId", protect, getMessages);
router.get("/chat-users", protect, getChatUsers);

export default router;
