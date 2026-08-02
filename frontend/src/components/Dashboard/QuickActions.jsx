import { useNavigate } from "react-router-dom";

import {
  Bot,
  BookOpen,
  BarChart3,
  UserRound,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import "./QuickActions.css";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Generate AI Plan",
      description: "Create a personalized study plan using AI.",
      icon: <Bot size={30} />,
      path: "/ai-planner",
    },
    {
      title: "My Plans",
      description: "View and manage all your study plans.",
      icon: <BookOpen size={30} />,
      path: "/my-plans",
    },
    {
      title: "Analytics",
      description: "Track your learning performance.",
      icon: <BarChart3 size={30} />,
      path: "/analytics",
    },
    {
      title: "Profile",
      description: "Update your profile information.",
      icon: <UserRound size={30} />,
      path: "/profile",
    },
  ];

  return (
    <div className="quick-actions">

      <div className="quick-header">

        <Sparkles size={22} />

        <h2>Quick Actions</h2>

      </div>

      <div className="quick-grid">

        {actions.map((action, index) => (

          <div
            key={index}
            className="quick-card"
            onClick={() => navigate(action.path)}
          >

            <div className="quick-icon">
              {action.icon}
            </div>

            <h3>{action.title}</h3>

            <p>{action.description}</p>

            <button>

              <span>Open</span>

              <ArrowRight size={16} />

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default QuickActions;