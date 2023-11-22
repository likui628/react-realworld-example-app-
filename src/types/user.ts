export interface LoginUser {
  password: string;
  email: string;
}

export interface RegisterUser extends LoginUser {
  username: string;
}

export interface User {
  email: string;
  username: string;
  bio: string | undefined;
  image: string | undefined;
  token: string;
}

export interface Profile {
  bio: string;
  following: boolean;
  image: string;
  username: string;
}
