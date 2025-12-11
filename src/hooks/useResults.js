import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as resultApi from '../services/resultApi';

/**
 * React Query hooks for Result/Answer operations
 */

// Query Keys
export const resultKeys = {
  all: ['results'],
  bySurvey: (surveyId) => [...resultKeys.all, 'survey', surveyId],
};

// Get jawaban/answers by survey ID
export const useJawabanBySurvey = (surveyId, options = {}) => {
  return useQuery({
    queryKey: resultKeys.bySurvey(surveyId),
    queryFn: () => resultApi.getJawabanBySurvey(surveyId),
    enabled: !!surveyId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

// Submit jawaban mutation
export const useSubmitJawaban = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resultApi.submitJawaban,
    onSuccess: (data, variables) => {
      // Invalidate results for the survey
      if (variables.surveyId) {
        queryClient.invalidateQueries({ 
          queryKey: resultKeys.bySurvey(variables.surveyId) 
        });
      }
      queryClient.invalidateQueries({ queryKey: resultKeys.all });
    },
  });
};
