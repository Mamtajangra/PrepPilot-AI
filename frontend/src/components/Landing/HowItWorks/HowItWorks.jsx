import "./HowItWorks.css";
import { Search, Sparkles, TrendingUp } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <Search size={32} />,
      step: "Step 1",
      title: "Choose Your Exam",
      description:
        "Select your target exam and enter your available study time.",
    },
    {
      icon: <Sparkles size={32} />,
      step: "Step 2",
      title: "Generate AI Study Plan",
      description:
        "PrepPilot AI creates a personalized roadmap based on your goals and schedule.",
    },
    {
      icon: <TrendingUp size={32} />,
      step: "Step 3",
      title: "Track Your Progress",
      description:
        "Complete daily tasks, monitor analytics, and stay consistent until exam day.",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <h2>How PrepPilot AI Works</h2>
        <p>
          Get started in just three simple steps and make your preparation more
          organized and effective.
        </p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-icon">{step.icon}</div>

            <span className="step-number">{step.step}</span>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;