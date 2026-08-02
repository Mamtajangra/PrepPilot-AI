import "./TodayPlans.css";

import {
  CalendarDays,
  PartyPopper,
} from "lucide-react";

function TodayPlans({ plans }) {

  const today = new Date().toISOString().split("T")[0];

  const todayPlans = plans.filter(
    (plan) => plan.study_date === today
  );

  return (
    <div className="today-plans">

      <div className="today-header">

        <div className="today-title">

          <CalendarDays size={22} />

          <h2>Today's Plans</h2>

        </div>

        <span>{todayPlans.length} Tasks</span>

      </div>

      {todayPlans.length === 0 ? (

        <div className="today-empty-state">

          <PartyPopper
            size={60}
            className="today-empty-icon"
          />

          <h3>No Plans for Today</h3>

          <p>
            Enjoy your day or generate a new study plan.
          </p>

        </div>

      ) : (

        <div className="today-list">

          {todayPlans.map((plan) => (

            <div
              className="today-card"
              key={plan.id}
            >

              <div className="today-info">

                <h3>{plan.subject}</h3>

                <p>{plan.topic}</p>

              </div>

              <span
                className={`status ${plan.status?.toLowerCase()}`}
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

export default TodayPlans;