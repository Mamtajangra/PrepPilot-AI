import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

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

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("PrepPilot AI Quiz",20,20);

    doc.setFontSize(11);

    const lines = doc.splitTextToSize(

      quiz.quiz,

      170

    );

    doc.text(lines,20,35);

    doc.save(

      `${quiz.exam}_${quiz.topic}.pdf`

    );

  };
    return (

    <div className="ai-page">

      <Sidebar />

      <main className="ai-content">

        <div className="page-title">

          <BookOpen size={34} />

          <h1>My Quizzes</h1>

        </div>

        <p className="subtitle">

          View and manage all your AI generated quizzes.

        </p>

        <div className="search-box">

          <Search size={18} />

          <input

            type="text"

            placeholder="Search by Exam, Subject or Topic..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

          />

        </div>

        {

          loading ?

          (

            <div className="loading-box">

              <LoaderCircle

                className="spin"

                size={45}

              />

              <h3>Loading Quizzes...</h3>

            </div>

          )

          :

          filteredQuizzes.length === 0 ?

          (

            <div className="planner-empty-state">

              <BookOpen

                size={65}

                className="empty-icon"

              />

              <h3>No Quiz Found</h3>

              <p>

                Generate your first AI Quiz.

              </p>

            </div>

          )

          :

          (

            <div className="quiz-grid">

              {

                filteredQuizzes.map((quiz) => (

                  <div

                    key={quiz.id}

                    className="quiz-card"

                  >

                    <div className="quiz-card-header">

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

                    <div className="quiz-actions">

                      <button

                        onClick={()=>

                          setSelectedQuiz(quiz)

                        }

                      >

                        <Eye size={18}/>

                        View

                      </button>

                      <button

                        onClick={()=>

                          handleCopy(quiz)

                        }

                      >

                        <Clipboard size={18}/>

                        Copy

                      </button>

                      <button

                        onClick={()=>

                          handlePDF(quiz)

                        }

                      >

                        <Download size={18}/>

                        PDF

                      </button>

                      <button

                        className="delete-btn"

                        onClick={()=>

                          handleDelete(

                            quiz.id

                          )

                        }

                      >

                        <Trash2 size={18}/>

                        Delete

                      </button>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

        {

          selectedQuiz &&

          <div

            className="quiz-modal"

            onClick={()=>

              setSelectedQuiz(null)

            }

          >

            <div

              className="quiz-modal-content"

              onClick={(e)=>

                e.stopPropagation()

              }

            >

              <h2>

                {selectedQuiz.exam}

              </h2>

              <pre>

                {selectedQuiz.quiz}

              </pre>

              <button

                onClick={()=>

                  setSelectedQuiz(null)

                }

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