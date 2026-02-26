import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [file, setFile] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= CREATE POST =================
  const createPost = async () => {
    if (!newPost && !file) return;

    const formData = new FormData();
    formData.append("text", newPost);
    if (file) {
      formData.append("file", file);
    }

    try {
      await API.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewPost("");
      setFile(null);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LIKE =================
  const likePost = async (id) => {
    await API.put(`/posts/${id}/like`);
    fetchPosts();
  };

  // ================= COMMENT =================
  const addComment = async (id) => {
    if (!commentText) return;

    await API.post(`/posts/${id}/comment`, {
      text: commentText,
    });

    setCommentText("");
    fetchPosts();
  };

  return (
    <div>
      {/* ================= CREATE POST ================= */}
      <div className="create-post-card">
        <textarea
          placeholder="Share something with your community..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={createPost}>Post</button>
      </div>

      {/* ================= POSTS ================= */}
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <div className="post-header">
            <div className="avatar">
              {post.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <h4>{post.user?.name || "Unknown User"}</h4>
          </div>

          {/* Text */}
          {post.text && <p className="post-text">{post.text}</p>}

          {/* File Rendering */}
          {post.fileUrl && (
            <div className="post-file">
              {post.fileType?.startsWith("image") ? (
                <img
                  src={post.fileUrl}
                  alt="post"
                  className="post-image"
                />
              ) : post.fileType === "application/pdf" ? (
                <a
                  href={post.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-link"
                >
                  📄 View PDF
                </a>
              ) : (
                <a
                  href={post.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-link"
                >
                  📎 View File
                </a>
              )}
            </div>
          )}

          <div className="post-actions">
            <button onClick={() => likePost(post._id)}>
              👍 {post.likes ? post.likes.length : 0}
            </button>
          </div>

          <div className="comments">
            {post.comments &&
              post.comments.map((c, i) => (
                <p key={i}>
                  <b>{c.user?.name || "User"}:</b> {c.text}
                </p>
              ))}

            <div className="comment-box">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={() => addComment(post._id)}>
                Send
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
