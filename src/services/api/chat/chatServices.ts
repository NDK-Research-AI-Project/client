import { api } from '../../axios/api';

interface IChatResponse {
  answer: string;
  session_id: string;
  user_message?: IMessage;
  assistant_message?: IMessage;
  explernation?: string[]
}

interface IResponseType {
  data?: IChatResponse;
  error?: string;
}

interface IUserPromtMessage {
  question: string;
  session_id?: string;
}

// New interfaces for chat history
interface IMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  explernation?: string[];
}

interface IChatSession {
  session_id: string;
  last_message_time: string;
  message_count: number;
  suggested_topic?: string;
  preview?: string;
}

interface ISessionsResponse {
  sessions: IChatSession[];
  total_count: number;
}

interface ICreateSessionResponse {
  session_id: string;
  message: string;
}

interface IAddMessagePayload {
  role: 'user' | 'assistant';
  content: string;
}

interface IDeleteSessionResponse {
  deleted_count: number;
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

// Enhanced chat service with session support
export const sendChatMessageToSession = async (
  sessionId: string,
  payload: { question: string }
): Promise<IResponseType> => {
  try {
    const { data } = await api.post<IChatResponse>(
      `/chat/${sessionId}/query`,
      payload
    );

    if (!data) {
      throw new Error(`Failed to get response from AI`);
    }

    return { data };
  } catch (error) {
    console.error('Error in sendChatMessageToSession:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: errorMessage };
  }
};

// Chat session management services
export const createChatSession = async (): Promise<{
  data?: ICreateSessionResponse;
  error?: string;
}> => {
  try {
    const { data } = await api.post<ICreateSessionResponse>('/chat/create');

    if (!data) {
      throw new Error('Failed to create chat session');
    }

    return { data };
  } catch (error) {
    console.error('Error in createChatSession:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: errorMessage };
  }
};

export const getChatSessions = async (): Promise<{
  data?: ISessionsResponse;
  error?: string;
}> => {
  try {
    const { data } = await api.get<ISessionsResponse>('/chat/sessions');

    if (!data) {
      throw new Error('Failed to fetch chat sessions');
    }

    return { data };
  } catch (error) {
    console.error('Error in getChatSessions:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: errorMessage };
  }
};

export const getChatHistory = async (
  sessionId: string,
  limit: number = 100,
  skip: number = 0
): Promise<{
  data?: IMessage[];
  error?: string;
}> => {
  try {
    const { data } = await api.get<IMessage[]>(`/chat/${sessionId}`, {
      params: { limit, skip }
    });

    if (!data) {
      throw new Error('Failed to fetch chat history');
    }

    return { data };
  } catch (error) {
    console.error('Error in getChatHistory:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: errorMessage };
  }
};

export const addMessageToSession = async (
  sessionId: string,
  payload: IAddMessagePayload
): Promise<{
  data?: IMessage;
  error?: string;
}> => {
  try {
    const { data } = await api.post<IMessage>(`/chat/${sessionId}`, payload);

    if (!data) {
      throw new Error('Failed to add message to session');
    }

    return { data };
  } catch (error) {
    console.error('Error in addMessageToSession:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: errorMessage };
  }
};

export const deleteChatSession = async (
  sessionId: string
): Promise<{
  data?: IDeleteSessionResponse;
  error?: string;
}> => {
  try {
    const { data } = await api.delete<IDeleteSessionResponse>(`/chat/${sessionId}`);

    if (!data) {
      throw new Error('Failed to delete chat session');
    }

    return { data };
  } catch (error) {
    console.error('Error in deleteChatSession:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: errorMessage };
  }
};

