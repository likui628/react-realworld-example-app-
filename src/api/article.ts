import { GET } from './config';
import { generateURLSearchParams } from '../utils';
import { Article } from '../types/article';

export interface ArticleQueryParams {
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface ArticleResponse {
  articlesCount: number;
  articles: Article[];
}

export const apiArticles = async (
  body: ArticleQueryParams
): Promise<ArticleResponse> => {
  return GET(`articles?${generateURLSearchParams(body)}`);
};
