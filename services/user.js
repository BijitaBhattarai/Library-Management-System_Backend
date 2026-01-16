import User from "../models/user.js";
import NotFoundError from "../error/not-found-error.js";

export const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export const updateUserById = async (userId, userData) => {
  delete userData.role;
  const user = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export const deleteUserById = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return { message: "User deleted successfully" };
};
