import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} from "../services/book.js";
import useValidator from "../middleware/useValidator.js";
import {
  CreateBookValidator,
  UpdateBookValidator,
} from "../validators/bookValidator.js";

const BOOK_ROUTER = Router();
BOOK_ROUTER.post(
  "/",
  useValidator(CreateBookValidator),
  async (req, res, next) => {
    try {
      const book = await createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  }
);
BOOK_ROUTER.get("/", async (req, res, next) => {
  try {
    const books = await getAllBooks(req.query);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});
BOOK_ROUTER.get("/:id", async (req, res, next) => {
  try {
    const book = await getBookById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});
BOOK_ROUTER.patch(
  "/:id",
  useValidator(UpdateBookValidator),
  async (req, res, next) => {
    try {
      const book = await updateBookById(req.params.id, req.body);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
);
BOOK_ROUTER.delete("/:id", async (req, res, next) => {
  try {
    const book = await deleteBookById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});
export default BOOK_ROUTER;
