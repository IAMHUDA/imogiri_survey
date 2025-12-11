import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as umkmApi from '../services/umkmApi';

/**
 * React Query hooks for UMKM operations
 */

// Query Keys
export const umkmKeys = {
  all: ['umkm'],
  lists: () => [...umkmKeys.all, 'list'],
  list: (filters) => [...umkmKeys.lists(), { filters }],
  details: () => [...umkmKeys.all, 'detail'],
  detail: (id) => [...umkmKeys.details(), id],
};

// Get all UMKM
export const useUMKMs = (options = {}) => {
  return useQuery({
    queryKey: umkmKeys.lists(),
    queryFn: umkmApi.getUMKMs,
    staleTime: 0, // 5 minutes
    ...options,
  });
};

// Get single UMKM by ID
export const useUMKM = (id, options = {}) => {
  return useQuery({
    queryKey: umkmKeys.detail(id),
    queryFn: () => umkmApi.getUMKM(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Create UMKM mutation
export const useCreateUMKM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: umkmApi.createUMKM,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: umkmKeys.lists() });
    },
  });
};

// Update UMKM mutation
export const useUpdateUMKM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: umkmApi.updateUMKM,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: umkmKeys.lists() });
      queryClient.invalidateQueries({ queryKey: umkmKeys.detail(variables.id) });
    },
  });
};

// Delete UMKM mutation
export const useDeleteUMKM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: umkmApi.deleteUMKM,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: umkmKeys.lists() });
    },
  });
};
