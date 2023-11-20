import { POST } from './config';
import { RegisterUser, User } from '../types/user';

export interface RegisterParam {
  user: RegisterUser;
}

export const apiRegisterUser = async (body: RegisterParam): Promise<User> => {
  return POST('users', body).then(data => data.user);
};
