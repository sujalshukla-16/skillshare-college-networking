import "./about.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About SkillShare</h1>
        <p>
          SkillShare is a professional college networking platform designed to
          connect students, faculty, and alumni in one collaborative digital
          community.
        </p>
      </div>

      <div className="about-section">
        <h2>🎯 Our Mission</h2>
        <p>
          Our mission is to bridge the gap between academic life and career
          growth by creating a space where students can connect with alumni,
          explore opportunities, and engage with faculty beyond the classroom.
        </p>
      </div>

      <div className="about-section">
        <h2>🚀 What SkillShare Offers</h2>
        <ul>
          <li>✔ Professional post sharing (text, images, documents)</li>
          <li>✔ Internship and course listings</li>
          <li>✔ Direct messaging between users</li>
          <li>✔ Alumni career journey showcases</li>
          <li>✔ Faculty event announcements</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>🤝 Who Can Join?</h2>
        <p>
          SkillShare is exclusively built for:
        </p>
        <ul>
          <li>🎓 Current Students</li>
          <li>👨‍🏫 Faculty Members</li>
          <li>🏆 Alumni</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>💡 Why SkillShare?</h2>
        <p>
          Unlike traditional social media platforms, SkillShare focuses purely
          on academic collaboration and career growth. It eliminates noise and
          promotes meaningful professional engagement within the college
          ecosystem.
        </p>
      </div>

      <div className="about-footer">
        <p>
          © {new Date().getFullYear()} SkillShare. Built for academic
          excellence and professional growth.
        </p>
      </div>
    </div>
  );
}

export default About;
