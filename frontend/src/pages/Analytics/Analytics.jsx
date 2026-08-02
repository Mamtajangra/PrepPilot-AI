import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getDashboardStats } from "../../services/PlannerService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  BarChart3,
  BookOpen,
  CircleCheckBig,
  Clock3,
  TrendingUp,
  Trophy,
  Database,
} from "lucide-react";

import "./Analytics.css";

const COLORS = ["#22c55e", "#f59e0b"];

function Analytics() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completion_rate: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();

      setStats({
        total: data.total || 0,
        completed: data.completed || 0,
        pending: data.pending || 0,
        completion_rate: data.completion_rate || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Completed",
      value: stats.completed,
    },
    {
      name: "Pending",
      value: stats.pending,
    },
  ];

  if (loading) {
    return (
      <div className="analytics-page">
        <Sidebar />

        <main className="analytics-content">
          <h2>Loading analytics...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <Sidebar />

      <main className="analytics-content">

        <div className="analytics-title">
          <BarChart3 size={34} />
          <h1>Study Analytics</h1>
        </div>

        <p className="analytics-subtitle">
          Track your study performance and stay consistent.
        </p>

        {/* Stats */}

        <div className="analytics-cards">

          <div className="card">
            <span className="card-icon">
              <BookOpen size={28} />
            </span>

            <h2>{stats.total}</h2>

            <p>Total Plans</p>
          </div>

          <div className="card">
            <span className="card-icon">
              <CircleCheckBig size={28} />
            </span>

            <h2>{stats.completed}</h2>

            <p>Completed</p>
          </div>

          <div className="card">
            <span className="card-icon">
              <Clock3 size={28} />
            </span>

            <h2>{stats.pending}</h2>

            <p>Pending</p>
          </div>

          <div className="card">
            <span className="card-icon">
              <TrendingUp size={28} />
            </span>

            <h2>{stats.completion_rate.toFixed(1)}%</h2>

            <p>Completion Rate</p>
          </div>

        </div>

        {stats.total === 0 ? (

          <div className="empty-state">

            <div className="empty-title">
              <Database size={30} />
              <h2>No Study Plans Yet</h2>
            </div>

            <p>
              Create your first study plan to see analytics.
            </p>

          </div>

        ) : (

          <>
            {/* Charts */}

            <div className="charts-grid">

              <div className="chart-container">

                <h2>Study Distribution</h2>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <PieChart>

                    <Pie
                      data={chartData}
                      dataKey="value"
                      outerRadius={90}
                      label
                    >

                      {chartData.map((item, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />
                      ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

              <div className="chart-container">

                <h2>Overall Progress</h2>

                <div className="progress-wrapper">

                  <div className="progress-header">

                    <span>Completion</span>

                    <span>
                      {stats.completion_rate.toFixed(1)}%
                    </span>

                  </div>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${stats.completion_rate}%`,
                      }}
                    />

                  </div>

                  <div className="progress-details">

                    <div>
                      <strong>{stats.completed}</strong>
                      <span>Completed</span>
                    </div>

                    <div>
                      <strong>{stats.pending}</strong>
                      <span>Pending</span>
                    </div>

                    <div>
                      <strong>{stats.total}</strong>
                      <span>Total</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Achievement */}

            <div className="achievement-card">

              <div className="achievement-title">
                
                <h2>Your Progress</h2>
              </div>

              <p>

                {stats.completion_rate >= 80 &&
                  "Outstanding! You're maintaining excellent consistency."}

                {stats.completion_rate >= 50 &&
                  stats.completion_rate < 80 &&
                  "Great work! Keep studying consistently to reach your goal."}

                {stats.completion_rate < 50 &&
                  "You're making progress. Complete more plans to improve your study performance."}

              </p>

            </div>

          </>

        )}

      </main>

    </div>
  );
}

export default Analytics;