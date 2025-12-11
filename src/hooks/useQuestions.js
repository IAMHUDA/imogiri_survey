import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as questionApi from '../services/questionApi';

/**
 * React Query hooks for Question operations
 */

// Query Keys
export const questionKeys = {
  all: ['questions'],
  lists: () => [...questionKeys.all, 'list'],
  list: (filters) => [...questionKeys.lists(), { filters }],
  bySurvey: (surveyId) => [...questionKeys.all, 'survey', surveyId],
  details: () => [...questionKeys.all, 'detail'],
  detail: (id) => [...questionKeys.details(), id],
};

// Get questions by survey ID
export const useQuestionsBySurvey = (surveyId, options = {}) => {
  return useQuery({
    queryKey: questionKeys.bySurvey(surveyId),
    queryFn: () => questionApi.getQuestionsBySurvey(surveyId),
    enabled: !!surveyId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Get single question by ID
export const useQuestion = (id, options = {}) => {
  return useQuery({
    queryKey: questionKeys.detail(id),
    queryFn: () => questionApi.getQuestion(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Create questions mutation
export const useCreateQuestions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: questionApi.createQuestions,
    onSuccess: (data, variables) => {
      // Invalidate questions for the survey
      if (variables.surveyId) {
        queryClient.invalidateQueries({ 
          queryKey: questionKeys.bySurvey(variables.surveyId) 
        });
      }
      queryClient.invalidateQueries({ queryKey: questionKeys.lists() });
    },
  });
};

// Update question mutation
export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: questionApi.updateQuestion,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: questionKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: questionKeys.lists() });
    },
  });
};

// Delete question mutation
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: questionApi.deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionKeys.lists() });
    },
  });
};
