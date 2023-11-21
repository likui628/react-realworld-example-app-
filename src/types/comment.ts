import { Profile } from './user';

export interface Comment {
  author: Profile;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}
