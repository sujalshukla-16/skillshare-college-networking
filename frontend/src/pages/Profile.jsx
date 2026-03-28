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
        <b>Role:</b> {user.role.toUpperCase()}
      </p>
      <p>
        <b>Department:</b> {user.department || "Computer Engineering"}
      </p>
      <p>
        <b>Skills:</b> {user.skills || "C,C++,Java,React,Node.JS,Git"}
      </p>
      <p>
        <b>Bio:</b> {user.bio || "Proud to be Engineer"}
      </p>
    </div>
  );
}

export default Profile;
