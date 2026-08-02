import "./Stats.css";
import {
  Users,
  BookOpen,
  Trophy,
  BrainCircuit,
} from "lucide-react";

function Stats() {
  const stats = [
    {
      icon: <BookOpen size={34} />,
      number: "10K+",
      title: "Study Plans Generated",
    },
    {
      icon: <Users size={34} />,
      number: "5K+",
      title: "Active Learners",
    },
    {
      icon: <Trophy size={34} />,
      number: "95%",
      title: "Success Rate",
    },
    {
      icon: <BrainCircuit size={34} />,
      number: "24/7",
      title: "AI Assistance",
    },
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {stats.map((item, index) => (
          <div className="stats-card" key={index}>
            <div className="stats-icon">{item.icon}</div>

            <h2>{item.number}</h2>

            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;