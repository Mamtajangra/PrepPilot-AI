import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";

import {
  Search,
  Trash2,
  Clipboard,
  Download,
  Eye,
  BookOpen,
  LoaderCircle,
} from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";

import {
  getMyQuizzes,
  deleteQuiz,
} from "../../services/AIQuizService";

import "./MyQuizzes.css";

function MyQuizzes() {

  const [quizzes, setQuizzes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {

    loadQuizzes();

  }, []);

  const loadQuizzes = async () => {

    try {

      setLoading(true);

      const data = await getMyQuizzes();

      setQuizzes(data);

    }

    catch (error) {

      console.error(error);

      toast.error("Failed to load quizzes.");

    }

    finally {

      setLoading(false);

    }

  };

  const filteredQuizzes = useMemo(() => {

    return quizzes.filter((quiz) => {

      const keyword = search.toLowerCase();

      return (

        quiz.exam.toLowerCase().includes(keyword) ||

        quiz.subject.toLowerCase().includes(keyword) ||

        quiz.topic.toLowerCase().includes(keyword)

      );

    });

  }, [search, quizzes]);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this quiz?")) {

      return;

    }

    try {

      await deleteQuiz(id);

      toast.success("Quiz Deleted");

      loadQuizzes();

    }

    catch {

      toast.error("Delete Failed");

    }

  };

  const handleCopy = async (quiz) => {

    try {

      await navigator.clipboard.writeText(

        quiz.quiz

      );

      toast.success("Copied");

    }

    catch {

      toast.error("Copy Failed");

    }

  };
const handlePDF = (quiz) => {

  const tempDiv = document.createElement("div");

  tempDiv.className = "pdf-export";

  tempDiv.style.padding = "30px";
  tempDiv.style.background = "#ffffff";
  tempDiv.style.color = "#000000";
  tempDiv.style.width = "800px";

  tempDiv.innerHTML = `
      <h1>PrepPilot AI Quiz</h1>

      <h3>Exam: ${quiz.exam}</h3>

      <h3>Subject: ${quiz.subject}</h3>

      <h3>Topic: ${quiz.topic}</h3>

      <hr/>

      <pre style="
          white-space:pre-wrap;
          font-family:inherit;
          font-size:14px;
      ">
${quiz.quiz}
      </pre>
  `;

  document.body.appendChild(tempDiv);

  html2pdf()
    .set({
      margin:10,
      filename:`${quiz.exam}_${quiz.topic}.pdf`,
      image:{
        type:"jpeg",
        quality:1,
      },
      html2canvas:{
        scale:2,
        backgroundColor:"#ffffff",
      },
      jsPDF:{
        unit:"mm",
        format:"a4",
        orientation:"portrait",
      },
      pagebreak:{
        mode:["css","legacy"],
      }
    })
    .from(tempDiv)
    .save()
    .then(()=>{

      document.body.removeChild(tempDiv);

      toast.success("PDF Downloaded!");

    });

};
  return (

  <div className="my-quizzes-page">

    <Sidebar />

    <main className="my-quizzes-content">

      {/* ================= TITLE ================= */}

      <div className="my-quizzes-title">

        <BookOpen size={34} />

        <h1>My Quizzes</h1>

      </div>

      <p className="my-quizzes-subtitle">

        View and manage all your AI generated quizzes.

      </p>

      {/* ================= SEARCH ================= */}

      <div className="my-quizzes-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search by Exam, Subject or Topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {

        loading ?

        <div className="my-quizzes-loading">

          <LoaderCircle
            className="spin"
            size={45}
          />

          <h3>

            Loading Quizzes...

          </h3>

        </div>

        :

        filteredQuizzes.length === 0 ?

        <div className="my-quizzes-empty">

          <BookOpen
            size={65}
            className="my-quizzes-empty-icon"
          />

          <h3>

            No Quiz Found

          </h3>

          <p>

            Generate your first AI Quiz.

          </p>

        </div>

        :

        <div className="my-quizzes-grid">

          {

            filteredQuizzes.map((quiz) => (

              <div
                key={quiz.id}
                className="my-quiz-card"
              >

                <div className="my-quiz-header">

                  <h3>

                    {quiz.exam}

                  </h3>

                </div>

                <p>

                  <strong>

                    Subject :

                  </strong>

                  {quiz.subject}

                </p>

                <p>

                  <strong>

                    Topic :

                  </strong>

                  {quiz.topic}

                </p>

                <p>

                  <strong>

                    Difficulty :

                  </strong>

                  {quiz.difficulty}

                </p>

                <p>

                  <strong>

                    Type :

                  </strong>

                  {quiz.question_type}

                </p>

                <p>

                  <strong>

                    Questions :

                  </strong>

                  {quiz.number_of_questions}

                </p>

                                    {/* ================= ACTIONS ================= */}

                <div className="my-quiz-actions">

                  <button
                    className="my-quiz-btn"
                    onClick={() => setSelectedQuiz(quiz)}
                  >

                    <Eye size={18} />

                    View

                  </button>

                  <button
                    className="my-quiz-btn"
                    onClick={() => handleCopy(quiz)}
                  >

                    <Clipboard size={18} />

                    Copy

                  </button>

                  <button
                    className="my-quiz-btn"
                    onClick={() => handlePDF(quiz)}
                  >

                    <Download size={18} />

                    PDF

                  </button>

                  <button
                    className="my-quiz-btn my-quiz-delete"
                    onClick={() => handleDelete(quiz.id)}
                  >

                    <Trash2 size={18} />

                    Delete

                  </button>

                </div>

              </div>

            ))

          }

        </div>

      }

      {

        selectedQuiz &&

        <div
          className="my-quiz-modal"
          onClick={() => setSelectedQuiz(null)}
        >

          <div
            className="my-quiz-modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <h2>

              {selectedQuiz.exam}

            </h2>

            <div
    className="my-quiz-pdf-content"
>

<pre>

    {selectedQuiz.quiz}

</pre>

</div>

            <button
              className="my-quiz-btn"
              onClick={() => setSelectedQuiz(null)}
            >

              Close

            </button>

          </div>

        </div>

      }

    </main>

  </div>

);

}

export default MyQuizzes;