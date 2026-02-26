import Post from "../models/Post.js";

// ================= CREATE POST =================
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    // Allow post if text OR file exists
    if (!text && !req.file) {
      return res
        .status(400)
        .json({ message: "Post must contain text or a file" });
    }

    const postData = {
      user: req.user._id,
      text,
    };

    // If file uploaded via Cloudinary
    if (req.file) {
      postData.fileUrl = req.file.secure_url;

      if (req.file.mimetype.startsWith("image")) {
        postData.fileType = "image";
      } else if (req.file.mimetype === "application/pdf") {
        postData.fileType = "pdf";
      }
    }

    const post = await Post.create(postData);

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL POSTS =================
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name role profilePic")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LIKE / UNLIKE =================
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const liked = post.likes.includes(req.user._id);

    if (liked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString(),
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({ likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADD COMMENT =================
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();

    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
