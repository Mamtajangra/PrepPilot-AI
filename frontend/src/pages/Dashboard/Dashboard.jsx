import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCards from "../../components/Dashboard/DashboardCards";
import ProgressBar from "../../components/Dashboard/ProgressBar";
import DashboardChart from "../../components/Dashboard/DashboardChart";
import TodayPlans from "../../components/Dashboard/TodayPlans";
import RecentPlans from "../../components/Dashboard/RecentPlans";
import QuickActions from "../../components/Dashboard/QuickActions";

import {
  getDashboardStats,
  getPlans,
} from "../../services/PlannerService";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completion_rate: 0,
  });

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardStats = await getDashboardStats();
      const allPlans = await getPlans();

      setStats(
        dashboardStats || {
          total: 0,
          completed: 0,
          pending: 0,
          completion_rate: 0,
        }
      );

      setPlans(allPlans || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

        {/* Hero */}

        <section className="hero-section">

          <div className="hero-left">

            <div className="hero-badge">

              <Sparkles size={16} />

              <span>PrepPilot AI</span>

            </div>

            <h1>
              Welcome Back,
              <span className="hero-name">
                {" "}Ready to Learn?
              </span>
            </h1>

            <p>
              Stay consistent, complete your study plans,
              and achieve your goals one day at a time.
            </p>

          </div>

          <div className="hero-right">

            <button
              className="generate-btn"
              onClick={() => navigate("/generate-plan")}
            >
              <span>Create Study Plan</span>

              <ArrowRight size={18} />
            </button>

          </div>

        </section>

        {/* Cards */}

        <DashboardCards stats={stats} />

        {/* Progress */}

        <div className="dashboard-progress-section">

          <div className="progress-left">

            <ProgressBar stats={stats} />

            <DashboardChart stats={stats} />

          </div>

        </div>

        {/* Plans */}

        <div className="dashboard-bottom">

          <TodayPlans plans={plans} />

          <RecentPlans plans={plans} />

        </div>

        {/* Quick Actions */}

        <div className="dashboard-actions">

          <QuickActions />

        </div>

      </main>

    </div>
  );
}

export default Dashboard;