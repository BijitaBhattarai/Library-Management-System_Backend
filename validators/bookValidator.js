import { body } from "express-validator";
import Book from "../models/book.js";

export const CreateBookValidator = [
  body("title").notEmpty().withMessage("Title is required"),

  body("author").notEmpty().withMessage("Author is required"),

  body("ISBN")
    .notEmpty()
    .withMessage("ISBN is required")
    .custom(async (value) => {
      const book = await Book.findOne({ ISBN: value });
      if (book) {
        throw new Error("ISBN already exists");
      }
      return true;
    }),

  body("category").notEmpty().withMessage("Category is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("totalCopies")
    .notEmpty()
    .withMessage("Total copies is required")
    .isInt({ min: 0 })
    .withMessage("Total copies must be a non-negative number"),

  body("availableCopies")
    .notEmpty()
    .withMessage("Available copies is required")
    .isInt({ min: 0 })
    .withMessage("Available copies must be a non-negative number"),
];

export const UpdateBookValidator = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),

  body("author").optional().notEmpty().withMessage("Author cannot be empty"),

  body("ISBN")
    .optional()
    .custom(async (value, { req }) => {
      const book = await Book.findOne({
        ISBN: value,
        _id: { $ne: req.params.id },
      });
      if (book) {
        throw new Error("ISBN already exists");
      }
      return true;
    }),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("totalCopies")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Total copies must be a non-negative number"),

  body("availableCopies")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Available copies must be a non-negative number"),

  body("isDeleted")
    .optional()
    .isBoolean()
    .withMessage("isDeleted must be true or false"),
];
