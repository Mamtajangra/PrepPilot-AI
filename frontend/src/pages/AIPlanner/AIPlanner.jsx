import { useState } from "react";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import CalendarModal from "../../components/Calendar/CalendarModal";
import {
  Bot,
  FileText,
  LoaderCircle,
  Save,
  Download,
  RefreshCcw,
  CalendarDays,
  Clipboard,
  Trash2,
  Sparkles,
} from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import { generateAIPlan } from "../../services/AIPlannerService";
import { saveAIPlan } from "../../services/PlannerService";
import {
  downloadICS,
  openGoogleCalendar,
  openOutlookCalendar,
} from "../../services/CalendarService";
import "./AIPlanner.css";

function AIPlanner() {
  const [form, setForm] = useState({
    exam: "",
    subject: "",
    topic: "",
    study_hours: "",
    days: "",
    difficulty: "Medium",
    language: "English",
    learning_style: "Balanced",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.exam ||
      !form.subject ||
      !form.topic ||
      !form.study_hours ||
      !form.days
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateAIPlan(form);

      setResult(data.study_plan || data.plan);

      toast.success("Study Plan Generated Successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to generate study plan."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlan = async () => {
    if (!result) {
      toast.error("Generate a study plan first.");
      return;
    }

    try {
      await saveAIPlan({
        subject: form.subject,
        topic: form.topic,
        study_date: new Date().toISOString().slice(0, 10),
      });

      toast.success("Plan Saved Successfully!");
    } catch {
      toast.error("Failed to save plan.");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);

    toast.success("Copied Successfully!");
  };

  const handleClear = () => {
    setResult("");

    toast.info("Plan Cleared");
  };

 const handleExportPDF = () => {

  if (!result) {
    toast.error("Generate a plan first.");
    return;
  }

  const element = document.getElementById("planner-pdf");
   element.classList.add("pdf-export");

  html2pdf()
    .set({
      margin: 10,
      filename: `${form.subject}_StudyPlan.pdf`,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
         backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["css", "legacy"],
      },
    })
    .from(element)
    .save()
    .then(() => {

            element.classList.remove("pdf-export");


  toast.success("PDF Downloaded!");
})};

  const handleRegenerate = () => {
    handleSubmit({
      preventDefault: () => {},
    });
  };

  const handleAddToCalendar = () => {

  if (!result) {
    toast.error("Generate a study plan first.");
    return;
  }

  setSelectedPlan({
    subject: form.subject,
    topic: form.topic,
    study_date: new Date().toISOString(),
  });

  setCalendarOpen(true);

};

  return (
    <div className="ai-planner-page">
      <Sidebar />

      <main className="ai-planner-content">
        <div className="ai-planner-title">
          <Bot size={34} />

          <h1>AI Study Planner</h1>
        </div>

        <p className="ai-planner-subtitle">
          Generate personalized AI study plans.
        </p>

        <div className="ai-planner-grid">
          <form
            className="ai-planner-form"
            onSubmit={handleSubmit}
          >

            <div className="ai-planner-form-group">
              <label>Exam</label>

              <input
                type="text"
                name="exam"
                value={form.exam}
                onChange={handleChange}
                placeholder="HTET / UPSC / GATE"
              />
            </div>

            <div className="ai-planner-form-group">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Mathematics"
              />
            </div>

            <div className="ai-planner-form-group">
              <label>Topic</label>

              <input
                type="text"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                placeholder="Matrices"
              />
            </div>

            <div className="ai-planner-form-group">
              <label>Study Hours / Day</label>

              <input
                type="number"
                name="study_hours"
                value={form.study_hours}
                onChange={handleChange}
                min="1"
                max="16"
              />
            </div>

            <div className="ai-planner-form-group">
              <label>Total Days</label>

              <input
                type="number"
                name="days"
                value={form.days}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="ai-planner-form-group">
              <label>Difficulty</label>

              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>

                <option value="Medium">Medium</option>

                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="ai-planner-form-group">
              <label>Language</label>

              <select
                name="language"
                value={form.language}
                onChange={handleChange}
              >
                <option value="English">English</option>

                <option value="Hindi">Hindi</option>

                <option value="Hinglish">Hinglish</option>
              </select>
            </div>

            <div className="ai-planner-form-group">
              <label>Learning Style</label>

              <select
                name="learning_style"
                value={form.learning_style}
                onChange={handleChange}
              >
                <option value="Balanced">Balanced</option>

                <option value="Theory First">
                  Theory First
                </option>

                <option value="Practice First">
                  Practice First
                </option>

                <option value="Revision Focused">
                  Revision Focused
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="ai-planner-btn-generate"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="spin"
                  />

                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />

                  Generate AI Plan
                </>
              )}
            </button>

          </form>
                    <div className="ai-planner-result">

            <div className="ai-planner-result-header">

              <h2 className="ai-planner-result-title">

                <FileText size={22} />

                Generated Study Plan

              </h2>

            </div>

            {loading ? (

              <div className="ai-planner-loading">

                <LoaderCircle
                  size={42}
                  className="spin"
                />

                <h3 className="ai-planner-loading-title">
                    Generating Study Plan...
               </h3>

                <p className="ai-planner-loading-text">
                    AI is preparing your personalized roadmap...
                </p>

              </div>

            ) : result ? (

              <>

                <div
id="planner-pdf"
className="ai-planner-markdown"
>

                  <ReactMarkdown>
                    {result}
                  </ReactMarkdown>

                </div>

                <div className="ai-planner-actions">

                  <button
                    type="button"
                    className="ai-planner-btn"
                    onClick={handleSavePlan}
                  >

                    <Save size={18} />

                    Save

                  </button>

                  <button
                    type="button"
                    className="ai-planner-btn"
                    onClick={handleExportPDF}
                  >

                    <Download size={18} />

                    PDF

                  </button>

                  <button
                    type="button"
                    className="ai-planner-btn"
                    onClick={handleRegenerate}
                  >

                    <RefreshCcw size={18} />

                    Regenerate

                  </button>

                  <button
                    type="button"
                    className="ai-planner-btn"
                    onClick={handleAddToCalendar}
                  >

                    <CalendarDays size={18} />

                    Calendar

                  </button>

                  <button
                    type="button"
                    className="ai-planner-btn"
                    onClick={handleCopy}
                  >

                    <Clipboard size={18} />

                    Copy

                  </button>

                  <button
                    type="button"
                    className="ai-planner-btn ai-planner-danger"
                    onClick={handleClear}
                  >

                    <Trash2 size={18} />

                    Clear

                  </button>

                </div>

              </>

            ) : (

              <div className="ai-planner-empty">

                <Bot
                  size={60}
                  className="ai-planner-empty-icon"
                />

                <h3>

                  AI Planner Ready

                </h3>

                <p>

                  Fill the form to generate a personalized AI study plan.

                </p>

                <ul>

                  <li>✔ Personalized Schedule</li>

                  <li>✔ Daily Study Plan</li>

                  <li>✔ Practice Questions</li>

                  <li>✔ Revision Strategy</li>

                  <li>✔ Difficulty Based Learning</li>

                  <li>✔ AI Powered Guidance</li>

                </ul>

              </div>

            )}

          </div>

        </div>


      </main>
      <CalendarModal
  open={calendarOpen}
  onClose={() => setCalendarOpen(false)}
  plan={selectedPlan}
/>

    </div>

  );

}

export default AIPlanner;