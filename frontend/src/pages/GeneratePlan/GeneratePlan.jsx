import { useState } from "react";
import {
  BookOpen,
  FileText,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { createPlanner } from "../../services/PlannerService";
import "./GeneratePlan.css";

function GeneratePlan() {
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    study_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");

    try {
      const response = await createPlanner(formData);

      console.log("Planner Created:", response);

      setSuccess("Study Planner Created Successfully 🎉");

      setFormData({
        subject: "",
        topic: "",
        study_date: "",
      });

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (error) {
      console.error("Planner Error:", error);

      if (error.response) {
        alert(
          `Error ${error.response.status}: ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        alert("No response received from backend.");
      } else {
        alert(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-container">

      <div className="generate-card">

        <div className="planner-header">

          <div>

            <h1>Create Study Planner</h1>

            <p>
              Organize your study schedule and achieve your
              learning goals with PrepPilot AI.
            </p>

          </div>

          <div className="planner-icon">
            <Sparkles size={40} />
          </div>

        </div>

        {success && (
          <div className="success-box">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>

              <BookOpen size={18} />

              Subject

            </label>

            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>

              <FileText size={18} />

              Topic

            </label>

            <input
              type="text"
              name="topic"
              placeholder="Enter Topic"
              value={formData.topic}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>

              <CalendarDays size={18} />

              Study Date

            </label>

            <input
              type="date"
              name="study_date"
              value={formData.study_date}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="generate-btn"
            disabled={loading}
          >

            {loading
              ? "Creating..."
              : "✨ Create Study Plan"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default GeneratePlan;