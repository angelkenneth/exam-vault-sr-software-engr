export interface User {
  id: number;
  username: string;
  password: string;
}

export interface SignInInput {
  username: string;
  password: string;
}

export interface SignUpOutput {
  okay: boolean;
}
