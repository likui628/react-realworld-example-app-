import { GET } from './config';

export async function apiGetAllTags(): Promise<string[]> {
  return await GET('tags').then(res => res.tags);
}
