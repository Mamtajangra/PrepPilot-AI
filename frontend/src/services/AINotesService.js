import api from "./api";

export const generateAINotes = async (formData) => {

  const response = await api.post(
    "/notes/generate",
    {
      exam: formData.exam,
      subject: formData.subject,
      topic: formData.topic,
      difficulty: formData.difficulty,
      length: formData.length,
    }
  );

  return response.data;
};