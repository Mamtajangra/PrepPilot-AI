import {
  CalendarDays,
  X,
  Download,
} from "lucide-react";

import {
  openGoogleCalendar,
  openOutlookCalendar,
  downloadICS,
} from "../../services/CalendarService";

import "./CalendarModal.css";

function CalendarModal({
  open,
  onClose,
  plan,
}) {
  if (!open || !plan) return null;

  return (
    <div
      className="calendar-overlay"
      onClick={onClose}
    >
      <div
        className="calendar-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="calendar-close"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <CalendarDays
          size={42}
          className="calendar-icon"
        />

        <h2>Add To Calendar</h2>

        <p>
          Choose where you want to add
          your study plan.
        </p>

        <button
          className="calendar-btn"
          onClick={() =>
            openGoogleCalendar(plan)
          }
        >
          🟢 Google Calendar
        </button>

        <button
          className="calendar-btn"
          onClick={() =>
            openOutlookCalendar(plan)
          }
        >
          🔵 Outlook Calendar
        </button>

        <button
          className="calendar-btn"
          onClick={() =>
            downloadICS(plan)
          }
        >
          <Download size={18} />

          Download .ics
        </button>

        <button
          className="calendar-cancel"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}

export default CalendarModal;