import axiosInstance from '../lib/axiosConfig';

/**
 * UMKM API Service
 * Handles all UMKM-related API calls
 */

// Get all UMKM
export const getUMKMs = async () => {
  const response = await axiosInstance.get('/api/umkm');
  return response.data; // UMKM returns array directly
};

// Get single UMKM by ID
export const getUMKM = async (id) => {
  const response = await axiosInstance.get(`/api/umkm/${id}`);
  return response.data;
};

// Create new UMKM with file upload
export const createUMKM = async (formData) => {
  const response = await axiosInstance.post('/api/umkm', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Update UMKM with file upload
export const updateUMKM = async ({ id, formData }) => {
  const response = await axiosInstance.put(`/api/umkm/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete UMKM
export const deleteUMKM = async (id) => {
  const response = await axiosInstance.delete(`/api/umkm/${id}`);
  return response.data;
};
