import { body } from "express-validator";
import mongoose from "mongoose";

// reservation.validator.js
export const CreateReservationValidator = [
  body("bookId")
    .notEmpty()
    .withMessage("Book is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid book ID");
      }
      return true;
    }),
];

export const UpdateReservationValidator = [
  body("status")
    .optional()
    .isIn(["PENDING", "NOTIFIED", "CANCELLED"])
    .withMessage("Status must be PENDING, NOTIFIED, or CANCELLED"),
];
