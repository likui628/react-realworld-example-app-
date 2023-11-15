import { GET } from './config';

export async function apiGetAllTags(): Promise<string[]> {
  try {
    const data = await GET('tags');

    return data.tags;
  } catch (error) {
    throw error;
  }
}
