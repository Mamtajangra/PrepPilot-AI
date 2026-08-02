import { useState } from "react";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";

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

    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text("PrepPilot AI Study Plan", 15, 20);

    pdf.setFontSize(11);

    const lines = pdf.splitTextToSize(result, 180);

    pdf.text(lines, 15, 35);

    pdf.save("StudyPlan.pdf");

    toast.success("PDF Downloaded");
  };

  const handleRegenerate = () => {
    handleSubmit({
      preventDefault: () => {},
    });
  };

  const handleAddToCalendar = () => {
    toast.info("Calendar Integration Coming Soon.");
  };

  return (
    <div className="ai-page">
      <Sidebar />

      <main className="ai-content">
        <div className="page-title">
          <Bot size={34} />

          <h1>AI Study Planner</h1>
        </div>

        <p className="subtitle">
          Generate personalized AI study plans.
        </p>

        <div className="planner-grid">

          <form
            className="ai-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label>Exam</label>

              <input
                type="text"
                name="exam"
                value={form.exam}
                onChange={handleChange}
                placeholder="HTET / UPSC / GATE"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Mathematics"
              />
            </div>

            <div className="form-group">
              <label>Topic</label>

              <input
                type="text"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                placeholder="Matrices"
              />
            </div>

            <div className="form-group">
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

            <div className="form-group">
              <label>Total Days</label>

              <input
                type="number"
                name="days"
                value={form.days}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
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
              className="generate-btn"
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
                    <div className="result-box">

            <div className="result-header">

              <h2>

                <FileText size={22} />

                Generated Study Plan

              </h2>

            </div>

            {loading ? (

              <div className="loading-box">

                <LoaderCircle
                  size={42}
                  className="spin"
                />

                <h3>Generating Study Plan...</h3>

                <p>

                  AI is preparing your personalized roadmap...

                </p>

              </div>

            ) : result ? (

              <>

                <div className="markdown-result">

                  <ReactMarkdown>
                    {result}
                  </ReactMarkdown>

                </div>

                <div className="plan-actions">

                  <button
                    type="button"
                    className="action-btn"
                    onClick={handleSavePlan}
                  >

                    <Save size={18} />

                    Save

                  </button>

                  <button
                    type="button"
                    className="action-btn"
                    onClick={handleExportPDF}
                  >

                    <Download size={18} />

                    PDF

                  </button>

                  <button
                    type="button"
                    className="action-btn"
                    onClick={handleRegenerate}
                  >

                    <RefreshCcw size={18} />

                    Regenerate

                  </button>

                  <button
                    type="button"
                    className="action-btn"
                    onClick={handleAddToCalendar}
                  >

                    <CalendarDays size={18} />

                    Calendar

                  </button>

                  <button
                    type="button"
                    className="action-btn"
                    onClick={handleCopy}
                  >

                    <Clipboard size={18} />

                    Copy

                  </button>

                  <button
                    type="button"
                    className="action-btn danger-btn"
                    onClick={handleClear}
                  >

                    <Trash2 size={18} />

                    Clear

                  </button>

                </div>

              </>

            ) : (

              <div className="planner-empty-state">

                <Bot
                  size={60}
                  className="empty-icon"
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

    </div>

  );

}

export default AIPlanner;