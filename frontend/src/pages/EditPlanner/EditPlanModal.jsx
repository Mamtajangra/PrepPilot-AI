import { useState, useEffect } from "react";
import "./EditPlanModal.css";

function EditPlanModal({
  isOpen,
  onClose,
  plan,
  onSave,
}) {
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    study_date: "",
    status: "Pending",
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        subject: plan.subject,
        topic: plan.topic,
        study_date: plan.study_date,
        status: plan.status,
      });
    }
  }, [plan]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(plan.id, formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Planner</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="study_date"
            value={formData.study_date}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Update
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditPlanModal;import { useEffect, useState } from "react";
import "./EditPlanModal.css";

function EditPlanModal({
  isOpen,
  onClose,
  plan,
  onSave,
}) {

  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    study_date: "",
    status: "Pending",
  });

  useEffect(() => {

    if(plan){

      setFormData({

        subject: plan.subject || "",

        topic: plan.topic || "",

        study_date: plan.study_date || "",

        status: plan.status || "Pending",

      });

    }

  }, [plan]);

  if(!isOpen) return null;

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(plan.id, formData);

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Study Plan</h2>

        <form onSubmit={handleSubmit}>

          <label>Subject</label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label>Topic</label>

          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />

          <label>Study Date</label>

          <input
            type="date"
            name="study_date"
            value={formData.study_date}
            onChange={handleChange}
            required
          />

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditPlanModal;