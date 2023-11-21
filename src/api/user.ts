import { DELETE, GET, POST, PUT } from './config';
import { Profile, RegisterUser, User } from '../types/user';

export interface LoginRegisterParam {
  user: RegisterUser;
}

export interface UpdateUser {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

export const apiRegisterUser = async (
  body: LoginRegisterParam
): Promise<User> => {
  return POST('users', body).then(data => data.user);
};

export const apiLoginUser = async (body: LoginRegisterParam): Promise<User> => {
  return POST('users/login', body).then(data => data.user);
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
