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

export interface Profile {
  bio: string;
  following: boolean;
  image: string;
  username: string;
}
