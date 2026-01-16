import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const reservationSchema = new Schema(
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

    status: {
      type: String,
      enum: ["PENDING", "NOTIFIED", "CANCELLED"],
      default: "PENDING",
    },

    reservedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Reservation = model("Reservation", reservationSchema);
export default Reservation;
