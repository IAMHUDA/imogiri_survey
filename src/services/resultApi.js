import axiosInstance from '../lib/axiosConfig';

/**
 * Result API Service
 * Handles survey result/answer submissions
 */

// Submit jawaban/answers for a survey
export const submitJawaban = async (jawabanData) => {
  const response = await axiosInstance.post('/api/results', jawabanData);
  return response.data;
};

// Get all jawaban/answers for a specific survey
export const getJawabanBySurvey = async (surveyId) => {
  const response = await axiosInstance.get(`/api/results/${surveyId}`);
  return response.data;
};
