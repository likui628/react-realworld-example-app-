import { POST } from './config';
import { RegisterUser, User } from '../types/user';

export interface LoginRegisterParam {
  user: RegisterUser;
}

export const apiRegisterUser = async (
  body: LoginRegisterParam
): Promise<User> => {
  return POST('users', body).then(data => data.user);
};

export const apiLoginUser = async (body: LoginRegisterParam): Promise<User> => {
  return POST('users/login', body).then(data => data.user);
};
