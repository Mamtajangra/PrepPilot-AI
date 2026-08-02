import { useNavigate } from "react-router-dom";
import {
  FileText,
  CalendarDays,
  ArrowRight,
  BookOpen,
} from "lucide-react";

import "./RecentPlans.css";

function RecentPlans({ plans }) {
  const navigate = useNavigate();

  const recentPlans = [...plans]
    .sort(
      (a, b) =>
        new Date(b.study_date) - new Date(a.study_date)
    )
    .slice(0, 5);

  return (
    <div className="recent-plans">

      <div className="recent-header">

        <div className="recent-title">

          <FileText size={22} />

          <h2>Recent Plans</h2>

        </div>

        <button
          className="view-all-btn"
          onClick={() => navigate("/my-plans")}
        >
          <span>View All</span>

          <ArrowRight size={17} />
        </button>

      </div>

      {recentPlans.length === 0 ? (

        <div className="recent-empty">

          <BookOpen
            size={60}
            className="empty-icon"
          />

          <h3>No Plans Found</h3>

          <p>Create your first study plan.</p>

        </div>

      ) : (

        <div className="recent-list">

          {recentPlans.map((plan) => (

            <div
              className="recent-card"
              key={plan.id}
            >

              <div className="avatar">
                {plan.subject?.charAt(0).toUpperCase()}
              </div>

              <div className="recent-info">

                <h3>{plan.subject}</h3>

                <p>{plan.topic}</p>

                <span className="date-chip">

                  <CalendarDays size={14} />

                  {plan.study_date}

                </span>

              </div>

              <span
                className={`badge ${plan.status?.toLowerCase()}`}
              >
                {plan.status}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecentPlans;