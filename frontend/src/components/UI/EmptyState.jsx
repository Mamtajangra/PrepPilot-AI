import "./common.css";

function EmptyState({
  icon,
  title,
  description,
}) {
  return (

    <div className="empty-state">

      {icon}

      <h3>{title}</h3>

      <p>{description}</p>

    </div>

  );
}

export default EmptyState;