import "./DashboardCards.css";

import {
  BookOpen,
  CircleCheckBig,
  Clock3,
  Target,
  TrendingUp,
} from "lucide-react";

function DashboardCards({ stats }) {

  const cards = [
    {
      title: "Total Plans",
      value: stats.total || 0,
      icon: <BookOpen size={28} />,
      color: "blue",
    },
    {
      title: "Completed",
      value: stats.completed || 0,
      icon: <CircleCheckBig size={28} />,
      color: "green",
    },
    {
      title: "Pending",
      value: stats.pending || 0,
      icon: <Clock3 size={28} />,
      color: "orange",
    },
    {
      title: "Progress",
      value: `${stats.completion_rate || 0}%`,
      icon: <Target size={28} />,
      color: "purple",
    },
  ];

  return (
    <div className="dashboard-cards">

      {cards.map((card, index) => (

        <div
          className={`dashboard-card ${card.color}`}
          key={index}
        >

          <div className="stats-top">

            <div>

              <span className="stats-title">
                {card.title}
              </span>

              <h2 className="stats-value">
                {card.value}
              </h2>

            </div>

            <div className="stats-icon">
              {card.icon}
            </div>

          </div>

          <div className="stats-bottom">

            <span className="trend">

              <TrendingUp size={16} />

              <span>Keep Going</span>

            </span>

          </div>

        </div>

      ))}

    </div>
  );
}

export default DashboardCards;