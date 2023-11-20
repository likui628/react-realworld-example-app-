export interface RegisterUser {
  username: string;
  password: string;
  email: string;
}
export interface User {
  email: string;
  username: string;
  bio: string | undefined;
  image: string | undefined;
  token: string;
}
