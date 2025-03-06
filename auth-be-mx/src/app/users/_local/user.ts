export interface User {
  id: number;
  username: string;
  password: string;
}

export type PublicUser = Omit<User, 'password'>;

export interface GenericUserInput {
  username: string;
  password: string;
}
