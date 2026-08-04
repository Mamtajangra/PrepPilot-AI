import api from "./api";

export const generateAIQuiz = async (formData) => {

  const response = await api.post(
    "/quiz/generate",
    {
      exam: formData.exam,
      subject: formData.subject,
      topic: formData.topic,
      difficulty: formData.difficulty,
      question_type: formData.question_type,
      number_of_questions: Number(formData.number_of_questions),
        language: formData.language,
    }
  );

  return response.data;
};

export const getMyQuizzes = async () => {

  const response = await api.get("/quiz/my-quizzes");

  return response.data;
};

export const getQuiz = async (id) => {

  const response = await api.get(`/quiz/${id}`);

  return response.data;
};

export const deleteQuiz = async (id) => {

  const response = await api.delete(`/quiz/${id}`);

  return response.data;
};

export const updateQuiz = async (id, data) => {

  const response = await api.put(`/quiz/${id}`, data);

  return response.data;
};