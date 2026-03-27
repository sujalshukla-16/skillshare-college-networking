import Message from "../models/Message.js";
import mongoose from "mongoose";

// ================= SEND MESSAGE =================
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      text,
      read: false,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET CHAT USERS =================
export const getChatUsers = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const messages = await Message.find({
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
    })
      .populate("sender", "name role")
      .populate("receiver", "name role")
      .sort({ createdAt: -1 });

    const usersMap = new Map();

    messages.forEach((msg) => {
      const senderId = msg.sender._id.toString();
      const receiverId = msg.receiver._id.toString();
      const currentUserId = userId.toString();

      let otherUser =
        senderId === currentUserId ? msg.receiver : msg.sender;

      if (!usersMap.has(otherUser._id.toString())) {
        usersMap.set(otherUser._id.toString(), otherUser);
      }
    });

    res.json(Array.from(usersMap.values()));
  } catch (error) {
    console.error("CHAT USERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET MESSAGES =================
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= MARK AS READ =================
export const markAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Message.updateMany(
      {
        sender: userId,
        receiver: req.user._id,
        read: false,
      },
      { $set: { read: true } }
    );

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("MARK READ ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= UNREAD COUNT =================
export const getUnreadCounts = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const messages = await Message.aggregate([
      {
        $match: {
          receiver: userId,
          read: false,
        },
      },
      {
        $group: {
          _id: "$sender",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(messages);
  } catch (error) {
    console.error("UNREAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
