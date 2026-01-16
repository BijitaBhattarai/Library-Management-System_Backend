import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    ISBN: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: String,

    totalCopies: {
      type: Number,
      required: true,
      min: 0,
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);
export default Book;
