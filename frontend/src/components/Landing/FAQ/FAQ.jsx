import "./FAQ.css";
import { ChevronDown } from "lucide-react";

function FAQ() {
  const faqs = [
    {
      question: "What is PrepPilot AI?",
      answer:
        "PrepPilot AI is an AI-powered study planner that helps students create personalized study plans, track progress, and stay organized for exams.",
    },
    {
      question: "Which exams does PrepPilot AI support?",
      answer:
        "You can use PrepPilot AI for government exams, university exams, competitive exams, and technical interview preparation.",
    },
    {
      question: "Is the study plan generated automatically?",
      answer:
        "Yes. The AI analyzes your exam, available study time, and goals to generate a personalized study schedule.",
    },
    {
      question: "Can I track my daily progress?",
      answer:
        "Absolutely! The dashboard includes progress analytics, completed tasks, pending tasks, and performance tracking.",
    },
  ];

  return (
    <section className="faq" id="faq">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>

        <p>
          Everything you need to know about PrepPilot AI.
        </p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <details className="faq-item" key={index}>
            <summary>
              {faq.question}
              <ChevronDown size={20} />
            </summary>

            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQ;