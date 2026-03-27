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

  useEffect(() => {
    loadChatUsers();
    loadUnread();
  }, []);

  const searchUsers = async () => {
    const res = await API.get(`/users/search?q=${query}`);
    setUsers(res.data);
  };

  const loadChatUsers = async () => {
    const res = await API.get("/messages/chat-users");
    setChatUsers(res.data);
  };

  const loadUnread = async () => {
    const res = await API.get("/messages/unread");
    setUnread(res.data);
  };

  const loadMessages = async (userId) => {
    const res = await API.get(`/messages/${userId}`);
    setMessages(res.data);
    setSelectedUser(userId);

    await API.put(`/messages/read/${userId}`);
    loadUnread();
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    await API.post("/messages", {
      receiverId: selectedUser,
      text,
    });

    setText("");
    loadMessages(selectedUser);
    loadChatUsers();
  };

  return (
    <div className="feed">

      <h2>Direct Messages</h2>

      <div className="dm-container">

        {/* ================= SIDEBAR ================= */}
        <div className="dm-sidebar">

          <h3>Chats</h3>

          {chatUsers.map((user) => {
            const unreadCount = unread.find(u => u._id === user._id)?.count;

            return (
              <div
                key={user._id}
                onClick={() => loadMessages(user._id)}
                className={`dm-user ${
                  selectedUser === user._id ? "active" : ""
                }`}
              >
                <div>
                  <b>{user.name}</b>
                  <div className="role">{user.role}</div>
                </div>

                {unreadCount > 0 && (
                  <span className="unread-badge">{unreadCount}</span>
                )}
              </div>
            );
          })}

          {/* ================= SEARCH ================= */}
          <div className="dm-search">
            <input
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={searchUsers}>Search</button>
          </div>

          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => loadMessages(user._id)}
              className="dm-user"
            >
              {user.name} ({user.role})
            </div>
          ))}

        </div>

        {/* ================= CHAT AREA ================= */}
        <div className="dm-chat">

          {!selectedUser ? (
            <div className="no-chat">
              Select a chat to start messaging
            </div>
          ) : (
            <>
              <div className="chat-header">Chat</div>

              <div className="chat-messages">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`chat-bubble ${
                      msg.sender === selectedUser ? "left" : "right"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default DM;
