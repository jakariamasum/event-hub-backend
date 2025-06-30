export interface IUser {
  name: string;
  password: string;
  email: string;
  photoURL?: string;
}

export interface isPasswordMatch {
  givenPassword: string;
  savedPassword: string;
}
