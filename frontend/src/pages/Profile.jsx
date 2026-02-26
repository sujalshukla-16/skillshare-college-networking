import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-card">
      <div className="profile-avatar">{user.name?.charAt(0).toUpperCase()}</div>

      <h2>{user.name}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Role:</b> {user.role}
      </p>
      <p>
        <b>Department:</b> {user.department || "Not specified"}
      </p>
      <p>
        <b>Skills:</b> {user.skills || "Not specified"}
      </p>
      <p>
        <b>Bio:</b> {user.bio || "No bio yet"}
      </p>
    </div>
  );
}

export default Profile;
