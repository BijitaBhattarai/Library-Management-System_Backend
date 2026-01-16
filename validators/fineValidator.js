import { body } from "express-validator";
import mongoose from "mongoose";

export const CreateFineValidator = [
  body("issueId")
    .notEmpty()
    .withMessage("Issue ID is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid issue ID");
      }
      return true;
    }),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a number greater than 0"),
];

export const UpdateFineValidator = [
  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a number greater than 0"),

  body("isPaid")
    .optional()
    .isBoolean()
    .withMessage("isPaid must be true or false"),
];
