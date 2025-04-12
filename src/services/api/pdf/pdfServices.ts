// API service for handling PDF uploads

import { api } from '../../axios/api';

interface IPdfUploadResponse {
  message: string;
  documentId?: string;
  // Add any other properties that might come from the API
}

interface IPdfResponseType {
  data?: IPdfUploadResponse;
  error?: string;
}

// Interface for document items returned from the backend
interface IPdfDocument {
  _id: string;
  filename: string;
  numberOfPages: number;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  azureBlobUrl: string;
  azureBlobName: string;
  downloadUrl: string;
}

interface IGetAllPdfResponse {
  documents?: IPdfDocument[];
  error?: string;
}

export const uploadPdfDocument = async (
  file: File
): Promise<IPdfResponseType> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

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
  } catch (error: any) {
    console.error('Error in uploadPdfDocument:', error);
    const errorMessage =
      error?.response?.data?.error || 'Unknown error occurred';
    return { error: errorMessage };
  }
};

/**
 * Fetches all uploaded PDF documents from the server
 */
export const getAllPdfDocuments = async (): Promise<IGetAllPdfResponse> => {
  try {
    const { data } = await api.get<IGetAllPdfResponse>('/documents');

    if (!data || !data.documents) {
      throw new Error('Failed to retrieve PDF documents');
    }

    return { documents: data.documents };
  } catch (error: any) {
    console.error('Error in getAllPdfDocuments:', error);
    const errorMessage =
      error?.response?.data?.error || 'Failed to retrieve PDF documents';
    return { error: errorMessage };
  }
};

// TODO : Not important for now, but we can implement this in the future
// export const deletePdfDocument = async (
//   documentId: string
// ): Promise<IPdfResponseType> => {
//   try {
//     const { data } = await api.delete<IPdfUploadResponse>(
//       `/documents/${documentId}`
//     );

//     if (!data) {
//       throw new Error('Failed to delete PDF document');
//     }

//     return { data };
//   } catch (error) {
//     console.error('Error in deletePdfDocument:', error);
//     const errorMessage =
//       error instanceof Error ? error.message : 'Unknown error occurred';
//     return { error: errorMessage };
//   }
// };
