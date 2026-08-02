import {
  BookOpen,
  CalendarDays,
  Pencil,
  Trash2,
  CircleCheckBig,
  BadgeCheck,
} from "lucide-react";

import "./PlanCard.css";

function PlanCard({
  plan,
  onDelete,
  onEdit,
  onComplete,
}) {
  const completed =
    plan.status?.toLowerCase() === "completed";

  return (
    <div className="plan-card">

      <div className="plan-top">

        <div className="subject-icon">
          <BookOpen size={22} />
        </div>

        <div className="subject-info">
  <h3>{plan.subject}</h3>

  <p title={plan.topic}>
    {plan.topic.length > 80
      ? `${plan.topic.substring(0, 80)}...`
      : plan.topic}
  </p>
</div>

      </div>

      <div className="plan-details">

        <div className="detail-row">

          <CalendarDays size={18} />

          <span>{plan.study_date}</span>

        </div>

        <div className="detail-row">

          <BadgeCheck size={18} />

          <span
            className={
              completed
                ? "status completed"
                : "status pending"
            }
          >
            {plan.status}
          </span>

        </div>

      </div>

      <div className="actions">

        <button
          className="complete-btn"
          disabled={completed}
          onClick={() => onComplete(plan)}
        >
          <CircleCheckBig size={18} />

          {completed
            ? "Completed"
            : "Complete"}
        </button>

        <button
          className="edit-btn"
          onClick={() => onEdit(plan)}
        >
          <Pencil size={17} />

          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(plan.id)}
        >
          <Trash2 size={17} />

          Delete
        </button>

      </div>

    </div>
  );
}

export default PlanCard;