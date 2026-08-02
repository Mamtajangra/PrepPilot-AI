import "./Navbar.css";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

function Navbar() {
  return (
    <nav className="landing-navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo" aria-label="PrepPilot AI Home">
          <GraduationCap size={28} />
          <span>PrepPilot AI</span>
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>
          <li>
            <a href="#tech-stack">Tech Stack</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="nav-buttons">
          <Link to="/login" className="nav-login-btn">
            Login
          </Link>

          <Link to="/register" className="nav-register-btn">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;