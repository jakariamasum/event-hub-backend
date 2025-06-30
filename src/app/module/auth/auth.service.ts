import config from "../../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/tokenGenerateFunction";
import { User } from "../user/user.model";
import { ILogin } from "./auth.interface";

const registerUserIntoDB = async (userData: ILogin) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(409, "User already exists");
  }
  const newUser = await User.create(userData);
  const token = createToken(
    { id: newUser._id.toString(), email: newUser.email },
    config.jwt_secret!,
    config.jwt_expires!
  );
  return token;
};

const loginUserIntoDB = async (loginData: ILogin) => {
  const { email, password } = loginData;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("The user does not exist");
  }

  const isPasswordMatch = await User.isPasswordMatch(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }
  const token = createToken(
    { id: user._id.toString(), email: user.email },
    config.jwt_secret!,
    config.jwt_expires!
  );

  return token;
};

export const authService = {
  registerUserIntoDB,
  loginUserIntoDB,
};
