import "./Hero.css";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CalendarDays,
  BarChart3,
  BrainCircuit,
} from "lucide-react";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">
          <Sparkles size={16} />
          AI Powered Study Platform
        </span>

        <h1>
          Study Smarter with
          <br />
          <span>PrepPilot AI</span>
        </h1>

        <p>
          Generate personalized study plans, monitor your progress,
          organize your schedule, and prepare smarter with an AI-powered
          study companion designed for students and aspirants.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="primary-btn">
            Get Started
          </Link>

          <a href="#features" className="secondary-btn">
            Explore Features
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-card-wrapper">
          <div className="hero-card">
            <h2>AI Study Dashboard</h2>

            <div className="feature-item">
              <CalendarDays size={20} />
              <span>Daily Study Planner</span>
            </div>

            <div className="feature-item">
              <BarChart3 size={20} />
              <span>Progress Analytics</span>
            </div>

            <div className="feature-item">
              <BrainCircuit size={20} />
              <span>AI Generated Study Plans</span>
            </div>

            <div className="progress-box">
              <p>Today's Progress</p>

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>

              <span>75% Completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;