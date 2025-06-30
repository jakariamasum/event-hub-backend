import { Model, model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    photoURL: {
      type: String,
      required: false,
      trim: true,
      default:
        "https://i.ibb.co/Q71Xvk0w/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds!)
  );
  next();
});

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export interface UserModel extends Model<IUser> {
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}

export const User = model<IUser, UserModel>("User", userSchema);
