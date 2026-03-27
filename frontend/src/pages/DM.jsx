import { useState } from "react";
import API from "../services/api";

function DM() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const searchUsers = async () => {
    const res = await API.get(`/users/search?q=${query}`);
    setUsers(res.data);
  };

  const loadMessages = async (userId) => {
    const res = await API.get(`/messages/${userId}`);
    setMessages(res.data);
    setSelectedUser(userId);
  };

  const sendMessage = async () => {
    await API.post("/messages", {
      receiverId: selectedUser,
      text,
    });

    setText("");
    loadMessages(selectedUser);
  };

  return (
    <div className="feed">

      <h2>Direct Messages</h2>

      {/* Search */}
      <input
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchUsers}>Search</button>

      {/* User List */}
      {users.map((user) => (
        <div key={user._id} onClick={() => loadMessages(user._id)}>
          {user.name} ({user.role})
        </div>
      ))}

      {/* Chat */}
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
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default DM;
