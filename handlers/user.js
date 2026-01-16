import Router from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../services/user.js";
import {
  CreateUserValidator,
  UpdateUserValidator,
} from "../validators/userValidator.js";
import useValidator from "../middleware/useValidator.js";
const USER_ROUTER = Router();

USER_ROUTER.post(
  "/",
  useValidator(CreateUserValidator),
  async (req, res, next) => {
    try {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError("Email already exists");
      }
      next(error);
    }
  }
);

USER_ROUTER.get("/", async (req, res, next) => {
  try {
    const user = await getAllUsers(req.query);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

USER_ROUTER.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

USER_ROUTER.patch(
  "/:id",
  useValidator(UpdateUserValidator),
  async (req, res, next) => {
    try {
      const user = await updateUserById(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

USER_ROUTER.delete("/:id", async (req, res, next) => {
  try {
    const user = await deleteUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
export default USER_ROUTER;
