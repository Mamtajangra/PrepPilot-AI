import api from "./api";

export const generateAIPlan = async (formData) => {

  const token = localStorage.getItem("token");

  const payload = {

    exam: formData.exam,

    subject: formData.subject,

    topic: formData.topic,

    study_hours: Number(formData.study_hours),

    days: Number(formData.days),

    difficulty: formData.difficulty,

    language: formData.language,

    learning_style: formData.learning_style,

  };

  const response = await api.post(

    "/ai/generate-plan",

    payload,

    {

      headers: {

        Authorization: `Bearer ${token}`,

      },

    }

  );

  return {

    plan: response.data.study_plan,

  };

};