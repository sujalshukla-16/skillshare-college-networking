import { useEffect, useState } from "react";
import API from "../services/api";

function Internships() {
  const [internships, setInternships] = useState([]);
  const [userRole, setUserRole] = useState("");

  const [formData, setFormData] = useState({
    company: "",
    duration: "",
    lastDate: "",
    stipend: "",
    description: "",
    applyLink: "",
  });

  useEffect(() => {
    fetchInternships();
    getUserRole();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await API.get("/internships");
      setInternships(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserRole = async () => {
    try {
      const res = await API.get("/users/profile");
      setUserRole(res.data.role);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createInternship = async () => {
    try {
      await API.post("/internships", formData);

      setFormData({
        company: "",
        duration: "",
        lastDate: "",
        stipend: "",
        description: "",
        applyLink: "",
      });

      fetchInternships();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="feed">

      {/* ADD INTERNSHIP FORM */}
      {(userRole === "faculty" || userRole === "alumni") && (
        <div className="create-post-card">

          <h3>Add Internship</h3>

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (eg: 6 months)"
            value={formData.duration}
            onChange={handleChange}
          />

          <input
            type="date"
            name="lastDate"
            value={formData.lastDate}
            onChange={handleChange}
          />

          <input
            type="text"
            name="stipend"
            placeholder="Stipend (Optional)"
            value={formData.stipend}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Additional Information"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="applyLink"
            placeholder="Apply Link"
            value={formData.applyLink}
            onChange={handleChange}
          />

          <button onClick={createInternship}>Post Internship</button>

        </div>
      )}

      {/* INTERNSHIP LIST */}
      {internships.map((internship) => (
        <div key={internship._id} className="post-card">

          <h3>{internship.company}</h3>

          <p><b>Duration:</b> {internship.duration}</p>

          <p>
            <b>Last Date:</b>{" "}
            {new Date(internship.lastDate).toLocaleDateString()}
          </p>

          {internship.stipend && (
            <p><b>Stipend:</b> {internship.stipend}</p>
          )}

          {internship.description && (
            <p>{internship.description}</p>
          )}

          <a
            href={internship.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-link"
          >
            Apply
          </a>

        </div>
      ))}
    </div>
  );
}

export default Internships;
