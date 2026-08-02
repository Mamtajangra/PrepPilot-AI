import "./DashboardShowcase.css";
import DashboardImage from "../../../assets/images/dashboard-preview.png";

function DashboardShowcase() {
  return (
    <section className="dashboard-showcase">
      <div className="showcase-container">
        <div className="showcase-content">
          <span className="showcase-tag">
            Dashboard Preview
          </span>

          <h2>Your Complete Study Dashboard</h2>

          <p>
            Manage your study plans, track progress, view analytics,
            organize your calendar, and generate AI-powered study
            schedules—all from one intuitive dashboard.
          </p>

          <ul className="dashboard-features">
            <li>✔ AI Generated Study Plans</li>
            <li>✔ Smart Progress Tracking</li>
            <li>✔ Interactive Analytics</li>
            <li>✔ Daily Task Management</li>
            <li>✔ Calendar Integration</li>
          </ul>
        </div>

        <div className="showcase-image">
          <img
            src={DashboardImage}
            alt="PrepPilot AI Dashboard Preview"
          />
        </div>
      </div>
    </section>
  );
}

export default DashboardShowcase;