import { useEffect, useState } from "react";
import { getProgress } from "../../services/ProgressService";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  TrendingUp,
  Flame,
  BookOpen,
  Clock3,
  Target,
  Award,
  Star,
  BarChart3,
} from "lucide-react";

import "./Progress.css";

function Progress() {
  const [progress, setProgress] = useState({
  total: 0,
  pending: 0,
  completed: 0,
  completion_rate: 0,
});

useEffect(() => {
  loadProgress();
}, []);

const loadProgress = async () => {
  try {
    const data = await getProgress();
    setProgress(data);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load progress.");
  }
};
  return (
    <div className="progress-page">
      <Sidebar />

      <main className="progress-content">
        {/* Header */}

        <section className="progress-hero">
          <div>
            <div className="hero-badge">
              <TrendingUp size={16} />
              <span>Progress Tracker</span>
            </div>

            <h1>Track Your Learning Journey</h1>

            <p>
              Monitor your consistency, achievements and daily study
              progress in one place.
            </p>
          </div>
        </section>

        {/* Stats */}

        <section className="progress-stats">
          <div className="progress-card">
            <Flame className="stat-icon" size={30} />

            <h2>{progress.total}</h2>
<p>Total Plans</p>
          </div>

          <div className="progress-card">
            <BookOpen className="stat-icon" size={30} />

            <h2>{progress.completed}</h2>
<p>Completed Plans</p>
          </div>

          <div className="progress-card">
            <Clock3 className="stat-icon" size={30} />

            <h2>{progress.pending}</h2>
<p>Pending Plans</p>
          </div>

          <div className="progress-card">
            <Target className="stat-icon" size={30} />

            <h2>{progress.completion_rate}%</h2>
<p>Completion Rate</p>
          </div>
        </section>

        {/* Weekly Progress */}

        <section className="progress-section">
          <h2>Weekly Progress</h2>

          <div className="chart-placeholder">
            <BarChart3 size={36} />

            <span>Weekly Progress Chart Coming Soon</span>
          </div>
        </section>

        {/* Today's Goal */}

        <section className="progress-section">
          <h2>Today's Goal</h2>

          <div className="goal-card">
            <div className="goal-header">
              <span>Completed</span>
<span>{progress.completion_rate}%</span>
            </div>

            <div className="goal-bar">
             <div
  className="goal-fill"
  style={{
    width: `${progress.completion_rate}%`,
  }}
></div>
            </div>
          </div>
        </section>

        {/* Achievements */}

        <section className="progress-section">
          <h2>Achievements</h2>

          <div className="achievement-grid">
            <div className="achievement-card">
              <Award size={18} />

              <span>First Study Plan</span>
            </div>

            <div className="achievement-card">
              <Flame size={18} />

              <span>7 Day Streak</span>
            </div>

            <div className="achievement-card">
              <BookOpen size={18} />

              <span>50 Topics</span>
            </div>

            <div className="achievement-card">
              <Star size={18} />

              <span>Consistent Learner</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Progress;