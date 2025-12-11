import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as surveyApi from '../services/surveyApi';

/**
 * React Query hooks for Survey operations
 */

// Query Keys
export const surveyKeys = {
  all: ['surveys'],
  lists: () => [...surveyKeys.all, 'list'],
  list: (filters) => [...surveyKeys.lists(), { filters }],
  details: () => [...surveyKeys.all, 'detail'],
  detail: (id) => [...surveyKeys.details(), id],
};

// Get all surveys
export const useSurveys = (options = {}) => {
  return useQuery({
    queryKey: surveyKeys.lists(),
    queryFn: surveyApi.getSurveys,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Get single survey by ID
export const useSurvey = (id, options = {}) => {
  return useQuery({
    queryKey: surveyKeys.detail(id),
    queryFn: () => surveyApi.getSurveyById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Create survey mutation
export const useCreateSurvey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: surveyApi.createSurvey,
    onSuccess: () => {
      // Invalidate and refetch surveys list
      queryClient.invalidateQueries({ queryKey: surveyKeys.lists() });
    },
  });
};

// Update survey mutation
export const useUpdateSurvey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: surveyApi.updateSurvey,
    onSuccess: (data, variables) => {
      // Invalidate both list and detail
      queryClient.invalidateQueries({ queryKey: surveyKeys.lists() });
      queryClient.invalidateQueries({ queryKey: surveyKeys.detail(variables.id) });
    },
  });
};

// Delete survey mutation
export const useDeleteSurvey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: surveyApi.deleteSurvey,
    onSuccess: () => {
      // Invalidate surveys list
      queryClient.invalidateQueries({ queryKey: surveyKeys.lists() });
    },
  });
};
