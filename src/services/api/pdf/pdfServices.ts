// API service for handling PDF uploads

import { api } from '../../axios/api';

interface IPdfUploadResponse {
  success: boolean;
  message: string;
  documentId?: string;
  // Add any other properties that might come from the API
}

interface IPdfResponseType {
  data?: IPdfUploadResponse;
  error?: string;
}

export const uploadPdfDocument = async (
  file: File
): Promise<IPdfResponseType> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    console.log('FormData:', formData); // Log the FormData object

    const { data } = await api.post<IPdfUploadResponse>(
      '/knowledge-graph/process-document',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (!data) {
      throw new Error('Failed to upload PDF document');
    }

    return { data };
  } catch (error) {
    console.error('Error in uploadPdfDocument:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: errorMessage };
  }
};

// TODO : Not important for now, but we can implement this in the future
export const deletePdfDocument = async (
  documentId: string
): Promise<IPdfResponseType> => {
  try {
    const { data } = await api.delete<IPdfUploadResponse>(
      `/documents/${documentId}`
    );

    if (!data) {
      throw new Error('Failed to delete PDF document');
    }

    return { data };
  } catch (error) {
    console.error('Error in deletePdfDocument:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: errorMessage };
  }
};
