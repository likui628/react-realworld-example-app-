import { DELETE, GET, POST } from './config';
import { Comment } from '../types/comment';

export const apiArticleComments = async (slug: string): Promise<Comment[]> => {
  return GET(`articles/${slug}/comments`).then(res => res.comments);
};

export const apiAddArticleComment = async (
  slug: string,
  body: string
): Promise<Comment> => {
  return POST(`articles/${slug}/comments`, { comment: { body } }).then(
    res => res.comment
  );
};

export const apiDeleteArticleComment = async (
  slug: string,
  id: number
): Promise<void> => {
  return DELETE(`articles/${slug}/comments/${id}`);
};
