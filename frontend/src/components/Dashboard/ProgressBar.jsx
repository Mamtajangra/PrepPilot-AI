import "./ProgressBar.css";

function ProgressBar({ stats }) {
  const completionRate = Number(stats?.completion_rate || 0);

  return (
    <div className="progress-card">
      <div className="progress-header">
        <div>
          <h3>📈 Study Progress</h3>
          <p>Keep improving your daily consistency.</p>
        </div>

        <div className="progress-percentage">
          {completionRate.toFixed(1)}%
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${completionRate}%`,
          }}
        ></div>
      </div>

      <div className="progress-stats">
        <div className="progress-box">
          <span>Total</span>
          <strong>{stats?.total || 0}</strong>
        </div>

        <div className="progress-box">
          <span>Completed</span>
          <strong>{stats?.completed || 0}</strong>
        </div>

        <div className="progress-box">
          <span>Pending</span>
          <strong>{stats?.pending || 0}</strong>
        </div>
      </div>

      <p className="progress-message">
        {completionRate >= 80
          ? " Excellent work! You're doing an amazing job."
          : completionRate >= 50
          ? " Great progress! Keep going."
          : completionRate > 0
          ? " You're making progress. Stay consistent."
          : " Create and complete study plans to track your progress."}
      </p>
    </div>
  );
}

export default ProgressBar;