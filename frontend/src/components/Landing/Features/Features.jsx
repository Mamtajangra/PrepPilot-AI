import "./Features.css";
import {
  BrainCircuit,
  CalendarDays,
  BarChart3,
  Clock3,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <BrainCircuit size={32} />,
      title: "AI Study Planner",
      description:
        "Generate personalized study plans tailored to your exam, schedule, and learning pace.",
    },
    {
      icon: <CalendarDays size={32} />,
      title: "Smart Calendar",
      description:
        "Organize your study routine with an intelligent calendar and daily task reminders.",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Progress Analytics",
      description:
        "Track completed tasks, monitor consistency, and visualize your learning progress.",
    },
    {
      icon: <Clock3 size={32} />,
      title: "Exam Countdown",
      description:
        "Stay focused with real-time countdowns for your upcoming exams and milestones.",
    },
    {
      icon: <CheckCircle2 size={32} />,
      title: "Task Management",
      description:
        "Create, update, and manage your study tasks with an intuitive planner dashboard.",
    },
    {
      icon: <BookOpen size={32} />,
      title: "All-in-One Dashboard",
      description:
        "Access your plans, analytics, calendar, and AI tools from a single workspace.",
    },
  ];

  return (
    <section className="features" id="features">
      <div className="features-header">
        <h2>Everything You Need to Study Smarter</h2>

        <p className="subtitle">
          PrepPilot AI combines planning, analytics, task management, and AI
          assistance into one modern learning platform.
        </p>
      </div>

      <div className="feature-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;