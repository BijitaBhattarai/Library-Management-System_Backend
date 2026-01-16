import { body } from "express-validator";
import mongoose from "mongoose";

export const CreateIssueValidator = [
  body("bookId")
    .notEmpty()
    .withMessage("Book is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid book ID");
      }
      return true;
    }),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Invalid due date format")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Due date must be a future date");
      }
      return true;
    }),
];

export const UpdateIssueValidator = [
  body("returnDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid return date format"),

  body("status")
    .optional()
    .isIn(["ISSUED", "RETURNED", "OVERDUE"])
    .withMessage("Status must be ISSUED, RETURNED, or OVERDUE"),
];
