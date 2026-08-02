import "./TechStack.css";
import {
  Code2,
  Database,
  Server,
  BrainCircuit,
  Globe,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

function TechStack() {
  const technologies = [
    {
      icon: <Code2 size={32} />,
      name: "React.js",
      description: "Modern frontend library for building interactive user interfaces.",
    },
    {
      icon: <Server size={32} />,
      name: "FastAPI",
      description: "High-performance Python backend framework.",
    },
    {
      icon: <Database size={32} />,
      name: "MongoDB",
      description: "NoSQL database for scalable applications.",
    },
    {
      icon: <BrainCircuit size={32} />,
      name: "Google Gemini AI",
      description: "AI-powered personalized study planner.",
    },
    {
      icon: <FaGithub size={32} />,
      name: "Git & GitHub",
      description: "Version control and collaborative development.",
    },
    {
      icon: <Globe size={32} />,
      name: "REST API",
      description: "Seamless frontend-backend communication.",
    },
  ];

  return (
    <section className="tech-stack" id="tech-stack">
      <div className="tech-header">
        <h2>Built with Modern Technologies</h2>

        <p>
          PrepPilot AI is built using modern technologies to deliver a fast,
          secure, scalable, and AI-powered learning experience.
        </p>
      </div>

      <div className="tech-grid">
        {technologies.map((tech, index) => (
          <div className="tech-card" key={index}>
            <div className="tech-icon">{tech.icon}</div>

            <h3>{tech.name}</h3>

            <p>{tech.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechStack;