import { GET, PageQueryParams } from './config';
import { generateURLSearchParams } from '../utils';
import { Article } from '../types/article';

export const ARTICLE_PAGE_LIMIT = 10;

export interface ArticleQueryParams extends PageQueryParams {
  author?: string;
  favorited?: string;
  tag?: string;
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

export const apiFeedArticles = async (
  body: PageQueryParams
): Promise<ArticleResponse> => {
  return GET(`articles/feed?${generateURLSearchParams(body)}`);
};
