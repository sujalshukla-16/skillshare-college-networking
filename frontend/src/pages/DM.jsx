import { useState, useEffect } from "react";
import API from "../services/api";

function DM() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const [chatUsers, setChatUsers] = useState([]);
  const [unread, setUnread] = useState([]);

  // ================= LOAD INITIAL DATA =================
  useEffect(() => {
    loadChatUsers();
    loadUnread();
  }, []);

  // ================= SEARCH USERS =================
  const searchUsers = async () => {
    const res = await API.get(`/users/search?q=${query}`);
    setUsers(res.data);
  };

  // ================= LOAD CHAT USERS =================
  const loadChatUsers = async () => {
    const res = await API.get("/messages/chat-users");
    console.log("Chat Users:", chatUsers);
    setChatUsers(res.data);
  };

  // ================= LOAD UNREAD =================
  const loadUnread = async () => {
    const res = await API.get("/messages/unread");
    setUnread(res.data);
  };

  // ================= LOAD MESSAGES =================
  const loadMessages = async (userId) => {
    const res = await API.get(`/messages/${userId}`);
    setMessages(res.data);
    setSelectedUser(userId);

    // mark as read
    await API.put(`/messages/read/${userId}`);
    loadUnread();
  };

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    if (!text.trim()) return;

    await API.post("/messages", {
      receiverId: selectedUser,
      text,
    });

    setText("");
    loadMessages(selectedUser);
    loadChatUsers(); // update chat list
  };

  return (
    <div className="feed">

      <h2>Direct Messages</h2>

      {/* ================= CHAT HISTORY ================= */}
      <h3>Chats</h3>

      console.log("👉 chatUsers state:", chatUsers);
      {chatUsers.map((user) => {
        const unreadCount = unread.find(u => u._id === user._id)?.count;

        return (
          <div
            key={user._id}
            onClick={() => loadMessages(user._id)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #333"
            }}
          >
            {user.name} ({user.role})

            {unreadCount > 0 && (
              <span style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "4px 8px",
                fontSize: "12px"
              }}>
                {unreadCount}
              </span>
            )}
          </div>
        );
      })}

      {/* ================= SEARCH ================= */}
      <h3>Search Users</h3>

      <input
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchUsers}>Search</button>

      {users.map((user) => (
        <div key={user._id} onClick={() => loadMessages(user._id)}>
          {user.name} ({user.role})
        </div>
      ))}

      {/* ================= CHAT ================= */}
      {selectedUser && (
        <div>
          <h3>Chat</h3>

          {messages.map((msg) => (
            <p key={msg._id}>
              <b>{msg.sender === selectedUser ? "Them" : "You"}:</b> {msg.text}
            </p>
          ))}

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}

    </div>
  );
}

export default DM;
