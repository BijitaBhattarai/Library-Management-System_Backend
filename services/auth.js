import jwt from "jsonwebtoken";
import { createUser } from "./user.js";
import NotFoundError from "../error/not-found-error.js";
import UnauthorizedError from "../error/unauthorized-error.js";
import User from "../models/user.js";
import { compare } from "bcrypt";

export const register = async (userData) => {
  const user = await createUser(userData);

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return {
    token,
    user,
  };
};
// export const login = async (userData) => {
//   const user = await User.findOne({ email: userData.email });
//   if (!user) {
//     throw new NotFoundError("This email is not registered");
//   }
//   const isPasswordValid = await compare(userData.password, user.password);
//   if (!isPasswordValid) {
//     throw new UnauthorizedError("Invalid credintials");
//   }
//   const token = jwt.sign(
//     { userId: user._id.toString() },
//     process.env.JWT_SECRET_KEY,
//     {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     }
//   );
//   return {
//     token,
//     user,
//   };
// };
export const login = async (userData) => {
  const { email, password } = userData;

  if (!email || !password) {
    throw new UnauthorizedError("Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new NotFoundError("This email is not registered");
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return { token, user };
};
