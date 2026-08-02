import { useState } from "react";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";

import {
  Bot,
  FileText,
  LoaderCircle,
  Download,
  RefreshCcw,
  Clipboard,
  Trash2,
  Sparkles,
} from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";

import { generateAIQuiz } from "../../services/AIQuizService";


import "./AIQuiz.css";

function AIQuiz() {

  const [form, setForm] = useState({

    exam: "",

    subject: "",

    topic: "",

    difficulty: "Medium",

    question_type: "MCQ",

    number_of_questions: 10,

  });

  const [quiz, setQuiz] = useState("");

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

      !form.topic

    ) {

      toast.error("Please fill all required fields.");

      return;

    }

    try {

      setLoading(true);

      const data = await generateAIQuiz(form);

      setQuiz(data.quiz);

      toast.success("Quiz Generated Successfully!");

    }

    catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.detail ||

        "Failed to Generate Quiz."

      );

    }

    finally {

      setLoading(false);

    }

  };

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(quiz);

      toast.success("Quiz Copied!");

    }

    catch {

      toast.error("Copy Failed.");

    }

  };

  const handleClear = () => {

    setQuiz("");

    toast.info("Quiz Cleared.");

  };

  const handleRegenerate = async () => {

    try {

      setLoading(true);

      const data = await generateAIQuiz(form);

      setQuiz(data.quiz);

      toast.success("Quiz Regenerated!");

    }

    catch {

      toast.error("Failed to regenerate quiz.");

    }

    finally {

      setLoading(false);

    }

  };

  const handleExportPDF = () => {

    if (!quiz) {

      toast.error("Generate quiz first.");

      return;

    }

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("PrepPilot AI Quiz", 20, 20);

    doc.setFontSize(12);

    const lines = doc.splitTextToSize(quiz, 170);

    doc.text(lines, 20, 35);

    doc.save(`${form.exam}_Quiz.pdf`);

    toast.success("PDF Downloaded!");

  };

    return (

    <div className="ai-page">

      <Sidebar />

      <main className="ai-content">

        <div className="page-title">

          <Bot size={34} />

          <h1>AI Quiz Generator</h1>

        </div>

        <p className="subtitle">

          Generate AI-powered quizzes for any exam.

        </p>

        <div className="planner-grid">

          {/* ================= FORM ================= */}

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
                placeholder="GATE / UPSC / HTET"
                required
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
                required
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
                required
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

              <label>Question Type</label>

              <select
                name="question_type"
                value={form.question_type}
                onChange={handleChange}
              >

                <option value="MCQ">MCQ</option>
                <option value="True / False">True / False</option>
                <option value="Short Answer">Short Answer</option>

              </select>

            </div>

            <div className="form-group">

              <label>Number of Questions</label>

              <input
                type="number"
                min="5"
                max="50"
                name="number_of_questions"
                value={form.number_of_questions}
                onChange={handleChange}
              />

            </div>

            <button
              type="submit"
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

                    Generate AI Quiz

                  </>

              }

            </button>

          </form>

          {/* ================= RESULT ================= */}

          <div className="result-box">

            <div className="result-header">

              <h2>

                <FileText size={22} />

                Generated Quiz

              </h2>

            </div>

            {

              loading ?

                <div className="loading-box">

                  <LoaderCircle
                    size={42}
                    className="spin"
                  />

                  <h3>

                    Generating Quiz...

                  </h3>

                  <p>

                    AI is preparing your personalized quiz.

                  </p>

                </div>

                :

                quiz ?

                  <>

                    <div className="markdown-result">

                      <ReactMarkdown>

                        {quiz}

                      </ReactMarkdown>

                    </div>

                    <div className="plan-actions">

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

                  :

                  <div className="planner-empty-state">

                    <Bot
                      size={60}
                      className="empty-icon"
                    />

                    <h3>

                      AI Quiz Generator Ready

                    </h3>

                    <p>

                      Fill the form and click
                      <strong> Generate AI Quiz </strong>
                      to create personalized questions.

                    </p>

                    <ul>

                      <li>MCQ Questions</li>

                      <li>True / False Questions</li>

                      <li>Short Answer Questions</li>

                      <li>Correct Answers</li>

                      <li>Detailed Explanations</li>

                    </ul>

                  </div>

            }

          </div>

        </div>

      </main>

    </div>

  );

}

export default AIQuiz;