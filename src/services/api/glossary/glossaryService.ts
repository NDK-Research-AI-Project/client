import { api } from '../../axios/api';

interface ISaveGlossary {
  term: string;
  definition: string;
}

interface ISaveGlossaryResponse {
  data?: { message: string };
  error?: string;
}

export const uploadGlossaries = async (
  glossaries: ISaveGlossary[]
): Promise<ISaveGlossaryResponse> => {
  try {
    const { data } = await api.post('/glossary/add', glossaries);

    if (!data) {
      throw new Error('Failed to save glossary');
    }

    return { data };
  } catch (error: any) {
    console.error('Error in uploadGlossaries:', error);
    const errorMessage =
      error?.response?.data?.error || 'Unknown error occurred';
    return { error: errorMessage };
  }
};

interface IGetGlossary {
  term: string;
  definition: string;
}

interface IGetAllGlossaryResponse {
  data?: IGetGlossary[];
  error?: string;
}

export const getAllGlossaries = async (): Promise<IGetAllGlossaryResponse> => {
  try {
    const { data } = await api.get('/glossary/list');

    if (!data) {
      throw new Error('Failed to glossaries');
    }

    return { data };
  } catch (error: any) {
    console.error('Error in getAllGlossaries:', error);
    const errorMessage =
      error?.response?.data?.error || 'Failed to retrieve glossaries...';
    return { error: errorMessage };
  }
};

interface IUpdateGlossary {
  term?: string;
  definition?: string;
}

interface IUpdateGlossaryResponse {
  data?: { message: string };
  error?: string;
}

export const updateGlossary = async (
  itemId: string,
  updateData: IUpdateGlossary
): Promise<IUpdateGlossaryResponse> => {
  try {
    const { data } = await api.patch(`/glossary/update/${itemId}`, updateData);

    if (!data) {
      throw new Error('Failed to update glossary');
    }

    return { data };
  } catch (error: any) {
    console.error('Error in updateGlossary:', error);
    const errorMessage =
      error?.response?.data?.error || 'Failed to update glossary item';
    return { error: errorMessage };
  }
};

interface IDeleteGlossaryResponse {
  data?: { message: string };
  error?: string;
}

export const deleteGlossary = async (
  itemId: string
): Promise<IDeleteGlossaryResponse> => {
  try {
    const { data } = await api.delete(`/glossary/delete/${itemId}`);

    if (!data) {
      throw new Error('Failed to delete glossary');
    }

    return { data };
  } catch (error: any) {
    console.error('Error in deleteGlossary:', error);
    const errorMessage =
      error?.response?.data?.error || 'Failed to delete glossary item';
    return { error: errorMessage };
  }
};
