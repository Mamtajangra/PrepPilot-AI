import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import { getPlans } from "../../services/PlannerService";

import "./CalendarPage.css";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => {
    return new Date(d).toISOString().split("T")[0];
  };

  const selectedDate = formatDate(date);

  const todaysPlans = plans.filter(
    (plan) => plan.study_date === selectedDate
  );

  const completed = plans.filter(
    (p) => p.status === "Completed"
  ).length;

  const pending = plans.filter(
    (p) => p.status !== "Completed"
  ).length;

  // Green / Orange dot on calendar
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const current = formatDate(date);

    const dayPlans = plans.filter(
      (plan) => plan.study_date === current
    );

    if (dayPlans.length === 0) return null;

    const allCompleted = dayPlans.every(
      (plan) => plan.status === "Completed"
    );

    return (
      <div
        className={`calendar-dot ${
          allCompleted ? "completed" : "pending"
        }`}
      />
    );
  };

  // Highlight dates having plans
  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";

    const current = formatDate(date);

    const hasPlan = plans.some(
      (plan) => plan.study_date === current
    );

    return hasPlan ? "has-plan" : "";
  };

  return (
    <div className="calendar-page">
      <Sidebar />

      <main className="calendar-content">

        <h1>📅 Study Calendar</h1>

        <p className="calendar-subtitle">
          Organize and track your daily study schedule.
        </p>

        {/* Summary Cards */}

        <div className="calendar-stats">

          <div className="calendar-stat-card">
            <h2>{plans.length}</h2>
            <p>Total Plans</p>
          </div>

          <div className="calendar-stat-card">
            <h2>{completed}</h2>
            <p>Completed</p>
          </div>

          <div className="calendar-stat-card">
            <h2>{pending}</h2>
            <p>Pending</p>
          </div>

        </div>

        {/* Calendar */}

        <div className="calendar-wrapper">

          <Calendar
            onChange={setDate}
            value={date}
            tileContent={tileContent}
            tileClassName={tileClassName}
          />

        </div>

        {/* Plans */}

        <div className="plans-section">

          <h2>Plans for {selectedDate}</h2>

          {loading ? (

            <p>Loading...</p>

          ) : todaysPlans.length === 0 ? (

            <div className="empty-plans">

              <h3>📖 No Study Plans</h3>

              <p>
                There are no study plans scheduled for this day.
              </p>

            </div>

          ) : (

            todaysPlans.map((plan) => (

              <div
                key={plan.id}
                className="calendar-card"
              >

                <div className="card-header">

                  <h3>{plan.subject}</h3>

                  <span
                    className={
                      plan.status === "Completed"
                        ? "status completed"
                        : "status pending"
                    }
                  >
                    {plan.status}
                  </span>

                </div>

                <p>{plan.topic}</p>

              </div>

            ))

          )}

        </div>

      </main>
    </div>
  );
}

export default CalendarPage;