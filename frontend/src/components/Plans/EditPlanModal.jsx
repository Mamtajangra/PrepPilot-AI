import { useEffect, useState } from "react";
import "./EditPlanModal.css";

function EditPlanModal({
  isOpen,
  onClose,
  plan,
  onSave,
}) {
  const [formData, setFormData] = useState({
    exam_name: "",
    duration: "",
    completed: false,
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        exam_name: plan.exam_name || "",
        duration: plan.duration || "",
        completed: plan.completed || false,
      });
    }
  }, [plan]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(plan.id,formData);
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Study Plan</h2>

        <form onSubmit={handleSubmit}>

          <label>Exam Name</label>

          <input
            type="text"
            name="exam_name"
            value={formData.exam_name}
            onChange={handleChange}
            required
          />

          <label>Duration</label>

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />

          <label className="checkbox">

            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />

            Completed

          </label>

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