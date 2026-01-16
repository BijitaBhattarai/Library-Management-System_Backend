import { register, login } from "../services/auth.js";
import { Router } from "express";

const AUTH_ROUTER = Router();
AUTH_ROUTER.post("/register", async (req, res, next) => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
AUTH_ROUTER.post("/login", async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default AUTH_ROUTER;
