import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const issueSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["ISSUED", "RETURNED", "OVERDUE"],
      default: "ISSUED",
    },
  },
  { timestamps: true }
);

const Issue = model("Issue", issueSchema);
export default Issue;
