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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import "./Progress.css";

function Progress() {
 const [progress, setProgress] = useState({
  total: 0,
  pending: 0,
  completed: 0,
  completion_rate: 0,
  study_hours: 0,
  day_streak: 0,
  goal_completed: 0,
  weekly_progress: [],
  
  
});
const [selectedAchievement, setSelectedAchievement] = useState(null);


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

            <h2>{progress.day_streak}</h2>
<p>Day Streak</p>

          </div>

          <div className="progress-card">
            <BookOpen className="stat-icon" size={30} />

            <h2>{progress.completed}</h2>
<p>Topics Completed</p>

          </div>

          <div className="progress-card">
            <Clock3 className="stat-icon" size={30} />

           <h2>{progress.study_hours}h</h2>
<p>Study Hours</p>
          </div>

          <div className="progress-card">
            <Target className="stat-icon" size={30} />

           <h2>{progress.goal_completed}%</h2>
<p>Goal Completed</p>
          </div>
        </section>

        {/* Weekly Progress */}

   <section className="progress-section">

  <h2>Weekly Progress</h2>

  <div style={{ width: "100%", height: 300 }}>

    <ResponsiveContainer width="100%" height="100%">

      <BarChart data={progress.weekly_progress}>

        <XAxis dataKey="day" />

        <YAxis allowDecimals={false} />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="planned"
          name="Planned"
          fill="#14B8A6"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="completed"
          name="Completed"
          fill="#0F766E"
          radius={[6, 6, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</section>

        {/* Today's Goal */}

<section className="progress-section">
  <h2>Today's Goal</h2>

  <div className="goal-card">

    <div className="goal-header">
      <span>Completed</span>

      <span>
        {progress.goal_completed}%
      </span>
    </div>

    <div className="goal-bar">

      <div
        className="goal-fill"
        style={{
          width: `${Math.min(progress.goal_completed, 100)}%`,
        }}
      />

    </div>

  </div>
</section>
        {/* Achievements */}

     <section className="progress-section">
  <h2>Achievements</h2>

  <div className="achievement-grid">

   {progress.total >= 1 && (
  <div
    className="achievement-card"
    onClick={() =>
      setSelectedAchievement({
        title: "First Study Plan",
        description: "You created your first study plan.",
        icon: <Award size={24} />,
      })
    }
  >
    <Award size={18} />
    <span>First Study Plan</span>
  </div>
)}

    {progress.day_streak >= 7 && (
      <div className="achievement-card">
        <Flame size={18} />
        <span>7 Day Streak</span>
      </div>
    )}

    {progress.completed >= 10 && (
      <div className="achievement-card">
        <BookOpen size={18} />
        <span>10 Topics Completed</span>
      </div>
    )}

    {progress.goal_completed >= 100 && (
      <div className="achievement-card">
        <Star size={18} />
        <span>Goal Achieved</span>
      </div>
    )}

  </div>
</section>
{selectedAchievement && (
  <div
    className="achievement-modal"
    onClick={() => setSelectedAchievement(null)}
  >
    <div
      className="achievement-modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="achievement-modal-icon">
        {selectedAchievement.icon}
      </div>

      <h2>{selectedAchievement.title}</h2>

      <p>{selectedAchievement.description}</p>

      <button
        className="achievement-close-btn"
        onClick={() => setSelectedAchievement(null)}
      >
        Close
      </button>
    </div>
  </div>
)}
      </main>
    </div>
  );
}

export default Progress;