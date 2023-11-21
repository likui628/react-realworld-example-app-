import { Profile } from './user';

export interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  author: Profile;
  favorited: boolean;
  favoritesCount: number;
}

export interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
