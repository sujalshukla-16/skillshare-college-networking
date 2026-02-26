import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <div className="logo-badge">SS</div>
        <span className="logo-text">SkillShare</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/internships">Internships</Link>
        <Link to="/dm">DM</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="nav-right">
        <Link to="/profile" className="profile-btn">
          Profile
        </Link>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
