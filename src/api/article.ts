import { DELETE, GET, PageQueryParams, POST } from './config';
import { generateURLSearchParams } from '../utils';
import { Article, NewArticle } from '../types/article';

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

export const apiArticle = async (slug: string): Promise<Article> => {
  return GET(`articles/${slug}`).then(res => res.article);
};

export const apiAddArticle = async (body: NewArticle): Promise<Article> => {
  return POST('articles', { article: body }).then(res => res.article);
};

export const apiDeleteArticle = async (slug: string): Promise<void> => {
  return DELETE(`articles/${slug}`);
};

export const apiFavoriteArticle = async (slug: string): Promise<Article> => {
  return POST(`articles/${slug}/favorite`).then(res => res.article);
};

export const apiUnfavoriteArticle = async (slug: string): Promise<Article> => {
  return DELETE(`articles/${slug}/favorite`).then(res => res.article);
};
