import "./CTA.css";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="cta">
      <div className="cta-container">
        <h2>Start Your Learning Journey Today</h2>

        <p>
          Join PrepPilot AI and generate personalized study plans,
          track your progress, and achieve your goals with the power
          of artificial intelligence.
        </p>

        <div className="cta-buttons">
          <Link to="/register" className="cta-primary">
            Get Started
            <ArrowRight size={18} />
          </Link>

          <Link to="/login" className="cta-secondary">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;