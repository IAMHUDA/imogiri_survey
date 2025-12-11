import axiosInstance from '../lib/axiosConfig';

/**
 * Survey API Service
 * Handles all survey-related API calls
 */

// Get all surveys
export const getSurveys = async () => {
  const response = await axiosInstance.get('/api/surveys');
  return response.data.data; // Backend returns { message, data: [...] }
};

// Get single survey by ID with questions and answers
export const getSurveyById = async (id) => {
  const response = await axiosInstance.get(`/api/surveys/${id}`);
  return response.data.data; // Backend returns { message, data: {...} }
};

// Create new survey (requires auth)
export const createSurvey = async (surveyData) => {
  const response = await axiosInstance.post('/api/surveys', surveyData);
  return response.data;
};

// Update survey (requires auth)
export const updateSurvey = async ({ id, data }) => {
  const response = await axiosInstance.put(`/api/surveys/${id}`, data);
  return response.data;
};

// Delete survey (requires auth)
export const deleteSurvey = async (id) => {
  const response = await axiosInstance.delete(`/api/surveys/${id}`);
  return response.data;
};
