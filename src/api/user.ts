import { DELETE, GET, POST, PUT } from './config';
import { LoginUser, Profile, RegisterUser, User } from '../types/user';

export interface UpdateUser {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

export const apiRegisterUser = async (user: RegisterUser): Promise<User> => {
  return POST('users', { user }).then(data => data.user);
};

export const apiLoginUser = async (user: LoginUser): Promise<User> => {
  return POST('users/login', { user }).then(data => data.user);
};

export const apiProfiles = async (username: string): Promise<Profile> => {
  return GET(`profiles/${username}`).then(data => data.profile);
};

export const apiFollowUser = async (username: string): Promise<Profile> => {
  return POST(`profiles/${encodeURIComponent(username)}/follow`).then(
    data => data.profile
  );
};

export const apiUnfollowUser = async (username: string): Promise<Profile> => {
  return DELETE(`profiles/${encodeURIComponent(username)}/follow`).then(
    data => data.profile
  );
};

export const apiUpdateUser = async (user: UpdateUser): Promise<User> => {
  return PUT('user', { user }).then(data => data.user);
};
