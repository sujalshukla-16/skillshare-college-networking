import { useEffect, useState } from "react";
import API from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState("");

  const [formData, setFormData] = useState({
    courseName: "",
    domain: "",
    duration: "",
    eligibleStudents: "",
    lastDate: "",
    description: "",
    applyLink: "",
  });

  useEffect(() => {
    fetchCourses();
    getUserRole();
  }, []);

  useEffect(() => {
    console.log("User Role:", userRole);
  }, [userRole]);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserRole = async () => {
    try {
      const res = await API.get("/users/profile");
      setUserRole(res.data.role);
    } catch (err) {
      console.error("PROFILE ERROR:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createCourse = async () => {
    try {
      await API.post("/courses", formData);

      setFormData({
        courseName: "",
        domain: "",
        duration: "",
        eligibleStudents: "",
        lastDate: "",
        description: "",
        applyLink: "",
      });

      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="feed">

      <h4>Current Role: {userRole}</h4>

      {/* ADD COURSE FORM */}
      {(userRole?.toLowerCase() === "faculty" ||
        userRole?.toLowerCase() === "alumni") && (

        <div className="form-card">
          <h3>Add Course</h3>

          <div className="form-group">
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="domain"
              placeholder="Course Domain"
              value={formData.domain}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="duration"
              placeholder="Course Duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="eligibleStudents"
              placeholder="Eligible Students (BE / BSc etc)"
              value={formData.eligibleStudents}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              placeholder="Additional Information"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="applyLink"
              placeholder="Apply Link"
              value={formData.applyLink}
              onChange={handleChange}
            />
          </div>

          <button onClick={createCourse}>Post Course</button>
        </div>
      )}

      {/* COURSE LIST */}
      {courses.map((course) => (
        <div key={course._id} className="post-card">

          <h3>{course.courseName}</h3>

          <p><b>Domain:</b> {course.domain}</p>
          <p><b>Duration:</b> {course.duration}</p>
          <p><b>Eligible:</b> {course.eligibleStudents}</p>

          {course.lastDate && (
            <p>
              <b>Last Date:</b>{" "}
              {new Date(course.lastDate).toLocaleDateString()}
            </p>
          )}

          {course.description && (
            <p>{course.description}</p>
          )}

          <a
            href={course.applyLink}
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

export default Courses;
