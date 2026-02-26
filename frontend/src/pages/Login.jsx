import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.update(toastId, {
        render: "Login successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.update(toastId, {
        render: err.response?.data?.message || "Invalid email or password",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to your SkillShare account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          New user? <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
