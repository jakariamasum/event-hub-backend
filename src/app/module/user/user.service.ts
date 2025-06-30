import { IUser } from "./user.interface";
import { User } from "./user.model";

const findUserByEmailFromDB = async (email: string) => {
  const user = await User.findOne({
    email: email,
  });
  return user;
};

const getAllUsersFromDB = async () => {
  const users = await User.find();
  return users;
};

export const userService = {
  findUserByEmailFromDB,
  getAllUsersFromDB,
};
