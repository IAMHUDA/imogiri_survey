import axiosInstance from '../lib/axiosConfig';

/**
 * Question API Service
 * Handles all question-related API calls
 */

// Get all questions by survey ID
export const getQuestionsBySurvey = async (surveyId) => {
  const response = await axiosInstance.get(`/api/questions/survey/${surveyId}`);
  return response.data.data; // Backend returns { message, data: [...] }
};

// Get single question by ID
export const getQuestion = async (id) => {
  const response = await axiosInstance.get(`/api/questions/${id}`);
  return response.data.data; // Backend returns { message, data: {...} }
};

// Create multiple questions (requires auth)
export const createQuestions = async (questionsData) => {
  const response = await axiosInstance.post('/api/questions', questionsData);
  return response.data;
};

// Update question (requires auth)
export const updateQuestion = async ({ id, data }) => {
  const response = await axiosInstance.put(`/api/questions/${id}`, data);
  return response.data;
};

// Delete question (requires auth)
export const deleteQuestion = async (id) => {
  const response = await axiosInstance.delete(`/api/questions/${id}`);
  return response.data;
};
