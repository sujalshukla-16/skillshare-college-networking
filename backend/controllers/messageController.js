import Message from "../models/Message.js";

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    const message = await Message.create({
  sender: req.user._id,
  receiver: receiverId,
  text,
  read: false,
});;

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all chat users (chat history)
export const getChatUsers = async (req, res) => {
  try {
    const userId = req.user._id;

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
      let otherUser;

      if (msg.sender._id.toString() === userId.toString()) {
        otherUser = msg.receiver;
      } else {
        otherUser = msg.sender;
      }

      // store latest chat only
      if (!usersMap.has(otherUser._id.toString())) {
        usersMap.set(otherUser._id.toString(), otherUser);
      }
    });

    res.json(Array.from(usersMap.values()));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get messages between two users
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
    res.status(500).json({ message: error.message });
  }
};

// ================= UNREAD COUNT =================
export const getUnreadCounts = async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          receiver: req.user._id,
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
    res.status(500).json({ message: error.message });
  }
};
console.log("Logged in user:", req.user._id);
console.log("Messages found:", messages.length);
