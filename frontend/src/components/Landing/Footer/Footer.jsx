import "./Footer.css";
import { Link } from "react-router-dom";
import { GraduationCap, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <GraduationCap size={28} />
            <span>PrepPilot AI</span>
          </div>

          <p>
            PrepPilot AI is an AI-powered study planner designed to help
            students create personalized study plans, track progress,
            manage tasks, and achieve their academic goals efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#tech-stack">Tech Stack</a>
          <a href="#faq">FAQ</a>
        </div>

        {/* Account */}
        <div className="footer-links">
          <h3>Account</h3>

          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        {/* Connect */}
        <div className="footer-links">
          <h3>Connect</h3>

          <a
            href="https://github.com/Mamtajangra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={18} />
            <span style={{ marginLeft: "8px" }}>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/mamta-jangra-9b2798345/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={18} />
            <span style={{ marginLeft: "8px" }}>LinkedIn</span>
          </a>

          <a href="mailto:mamtajangra204@gmail.com">
            <Mail size={18} />
            <span style={{ marginLeft: "8px" }}>
              mamtajangra204@gmail.com
            </span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} PrepPilot AI. All Rights Reserved. |
        Built with ❤️ by{" "}
        <a
          href="https://github.com/Mamtajangra"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mamta Jangra
        </a>
      </div>
    </footer>
  );
}

export default Footer;