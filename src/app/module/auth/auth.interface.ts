export interface ILogin {
  email: string;
  password: string;
}
export interface ISignUp extends ILogin {
  name: string;
  photoURL?: string;
}
