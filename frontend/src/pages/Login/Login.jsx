import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BrainCircuit } from "lucide-react";
import { loginUser } from "../../services/authService";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.access_token);

      toast.success("Login Successful ");

      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.detail || "Login Failed";

      setError(message);

      toast.error(message);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Logo */}

        <div className="login-logo">
             <BrainCircuit size={40} />
        </div>

        {/* Heading */}

        <h1>PrepPilot AI</h1>

        <p className="login-subtitle">
          Sign in to continue your learning journey.
        </p>

        {/* Error */}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="login-submit-btn"
          >
            Login
          </button>

        </form>

        {/* Register */}

        <p className="register-text">

          Don't have an account?{" "}

          <span onClick={() => navigate("/register")}>
            Register
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;