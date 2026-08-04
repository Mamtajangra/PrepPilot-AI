import "./Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FilePlus2,
  BookOpen,
  UserRound,
  Settings,
  BarChart3,
  Bot,
  TrendingUp,
  BrainCircuit,
  ClipboardList,
  LogOut,
  NotebookPen,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
     {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Generate Plan",
      path: "/generate-plan",
      icon: <FilePlus2 size={20} />,
    },

    {
      name: "My Plans",
      path: "/my-plans",
      icon: <BookOpen size={20} />,
    },

    {
      name: "AI Planner",
      path: "/ai-planner",
      icon: <Bot size={20} />,
    },

    {
      name: "AI Quiz",
      path: "/ai-quiz",
      icon: <BrainCircuit size={20} />,
    },
    {
      name: "AI Notes",
      path: "/ai-notes",
      icon: <NotebookPen size={20} />,
    },

{
      name: "My Quizzes",
      path: "/my-quizzes",
      icon: <ClipboardList size={20} />,
    },

    {
      name: "Progress",
      path: "/progress",
      icon: <TrendingUp size={20} />,
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} />,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <UserRound size={20} />,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
];


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      {/* Top Section */}
      <div className="sidebar-top">

        {/* Logo */}
        <div className="logo-container">

          <div className="logo-icon">
            <BrainCircuit size={26} />
          </div>

          <div>
            <h2 className="logo">PrepPilot AI</h2>
            <p className="logo-subtitle">
              AI Study Assistant
            </p>
          </div>

        </div>

        {/* Menu */}
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={
                location.pathname === item.path
                  ? "active-menu"
                  : ""
              }
            >
              <Link to={item.path}>
                <span className="menu-icon">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

      </div>

      {/* Logout */}
      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;