import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import "../Dashboard/Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import html2pdf from "html2pdf.js";
import { generateAINotes } from "../../services/AINotesService";

import {
  Bot,
  Sparkles,
  LoaderCircle,
  FileText,
  Clipboard,
  Download,
  RefreshCcw,
} from "lucide-react";

import "./AINotes.css";

function AINotes() {
const [form, setForm] = useState({
  exam: "",
  subject: "",
  topic: "",
  difficulty: "Medium",
  length: "Medium",
});

const [notes, setNotes] = useState("");

const [loading, setLoading] = useState(false);
const handleChange = (e) => {
  setForm((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = await generateAINotes(form);

    setNotes(data.notes);

    toast.success("Notes Generated Successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to Generate Notes");
  } finally {
    setLoading(false);
  }
}; 
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(notes);
    toast.success("Notes Copied!");
  } catch {
    toast.error("Copy Failed.");
  }
};

const handleRegenerate = () => {
  handleSubmit({
    preventDefault: () => {},
  });
};

const handleExportPDF = () => {

  if (!notes) {
    toast.error("Generate notes first.");
    return;
  }

  const element = document.getElementById("notes-pdf");
  element.classList.add("pdf-export");
  // Backup original styles
const oldBg = element.style.background;
const oldColor = element.style.color;

// PDF friendly styles
element.style.background = "#ffffff";
element.style.color = "#000000";

  html2pdf()
    .set({
      margin: 10,
      filename: `${form.subject}_Notes.pdf`,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
        backgroundColor:"#ffffff"
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

    // Restore original styles
    element.style.background = oldBg;
    element.style.color = oldColor;

  toast.success("PDF Downloaded!");
})};
return (
  <div className="ai-notes-page">

    <Sidebar />

    <main className="ai-notes-content">

      {/* ================= TITLE ================= */}

      <div className="ai-notes-title">

        <Bot size={34} />

        <h1>AI Notes Generator</h1>

      </div>

      <p className="ai-notes-subtitle">

        Generate AI-powered study notes for any topic.

      </p>

      {/* ================= GRID ================= */}

      <div className="ai-notes-grid">

        {/* ================= FORM ================= */}

        <form
          className="ai-notes-form"
          onSubmit={handleSubmit}
        >

          <div className="ai-notes-form-group">

            <label>Exam</label>

            <input
              type="text"
              name="exam"
              value={form.exam}
              onChange={handleChange}
              placeholder="GATE / UPSC / HTET"
              required
            />

          </div>

          <div className="ai-notes-form-group">

            <label>Subject</label>

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Mathematics"
              required
            />

          </div>

          <div className="ai-notes-form-group">

            <label>Topic</label>

            <input
              type="text"
              name="topic"
              value={form.topic}
              onChange={handleChange}
              placeholder="Matrices"
              required
            />

          </div>

          <div className="ai-notes-form-group">

            <label>Difficulty</label>

            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >

              <option>Easy</option>

              <option>Medium</option>

              <option>Hard</option>

            </select>

          </div>

          <div className="ai-notes-form-group">

            <label>Length</label>

            <select
              name="length"
              value={form.length}
              onChange={handleChange}
            >

              <option>Short</option>

              <option>Medium</option>

              <option>Detailed</option>

            </select>

          </div>

          <button
            type="submit"
            className="ai-notes-btn-generate"
            disabled={loading}
          >

            {

              loading ?

              <>

                <LoaderCircle
                  size={18}
                  className="spin"
                />

                Generating...

              </>

              :

              <>

                <Sparkles size={18} />

                Generate Notes

              </>

            }

          </button>

        </form>

{/* ================= RESULT ================= */}

<div className="ai-notes-result">

  <div className="ai-notes-result-header">

    <h2 className="ai-notes-result-title">

      <FileText size={22} />

      Generated Notes

    </h2>

  </div>

  {

    loading ?

    <div className="ai-notes-loading">

      <LoaderCircle
        size={42}
        className="spin"
      />

      <h3 className="ai-notes-loading-title">

        Generating Notes...

      </h3>

      <p className="ai-notes-loading-text">

        AI is preparing your study notes.

      </p>

    </div>

    :

    notes ?

    <>

      <div className="ai-notes-actions">

        <button
type="button"
className="ai-notes-btn"
onClick={handleCopy}
>

          <Clipboard size={18} />

          Copy

        </button>

        <button
          type="button"
          className="ai-notes-btn"
          onClick={handleExportPDF}
        >

          <Download size={18} />

          PDF

        </button>

       <button
type="button"
className="ai-notes-btn"
onClick={handleRegenerate}
>

          <RefreshCcw size={18} />

          Regenerate

        </button>

      </div>
<div
id="notes-pdf"
className="ai-notes-markdown"
>

        <ReactMarkdown>

          {notes}

        </ReactMarkdown>

      </div>

    </>

    :

    <div className="ai-notes-empty">

      <Bot
        size={60}
        className="ai-notes-empty-icon"
      />

      <h3>

        AI Notes Generator Ready

      </h3>

      <p>

        Fill the form and click
        <strong> Generate Notes </strong>
        to create AI-powered study notes.

      </p>

      <ul>

        <li>Definitions</li>

        <li>Concepts</li>

        <li>Examples</li>

        <li>Formula Sheet</li>

        <li>Revision Notes</li>

      </ul>

    </div>

  }

</div>

      </div>

    </main>

  </div>

);

}

export default AINotes;