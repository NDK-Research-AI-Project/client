import { api } from '../../axios/api';

interface IChatResponse {
  answer: string;
  // Add any other properties that might come from the API
}

interface IResponseType {
  data?: IChatResponse;
  error?: string;
}

interface IUserPromtMessage {
  question: string;
}

export const sendChatMessage = async (
  payload: IUserPromtMessage
): Promise<IResponseType> => {
  try {
    const { data } = await api.post<IChatResponse>(
      '/knowledge-graph/query',
      payload
    );

    if (!data) {
      throw new Error(`Failed to get response from AI`);
    }

    return { data };
  } catch (error) {
    console.error('Error in sendChatMessage:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: errorMessage };
  }
};
