import Reservation from "../models/reservation.js";
import Book from "../models/book.js";
import NotFoundError from "../error/not-found-error.js";
import ConflictError from "../error/conflict-error.js";

/**
 * Create reservation
 */
export const reserveBook = async ({ userId, bookId }) => {
  const book = await Book.findById(bookId);
  if (!book) throw new NotFoundError("Book not found");

  if (book.availableCopies > 0) {
    throw new ConflictError("Book is available. You can issue it directly.");
  }

  const alreadyReserved = await Reservation.findOne({
    user: userId,
    book: bookId,
    status: "ACTIVE",
  });

  if (alreadyReserved) {
    throw new ConflictError("You have already reserved this book");
  }

  const reservation = await Reservation.create({
    user: userId,
    book: bookId,
  });

  return reservation;
};

/**
 * Cancel reservation
 */
export const cancelReservation = async (reservationId) => {
  const reservation = await Reservation.findById(reservationId);

  if (!reservation) {
    throw new NotFoundError("Reservation not found");
  }

  if (reservation.status !== "ACTIVE") {
    throw new ConflictError("Reservation already cancelled or fulfilled");
  }

  reservation.status = "CANCELLED";
  await reservation.save();

  return reservation;
};

/**
 * Get all reservations
 */
export const getAllReservations = async () => {
  return await Reservation.find()
    .populate("user", "name email")
    .populate("book", "title author");
};

/**
 * Get reservation by ID
 */
export const getReservationById = async (reservationId) => {
  const reservation = await Reservation.findById(reservationId)
    .populate("user", "name email")
    .populate("book", "title author");

  if (!reservation) {
    throw new NotFoundError("Reservation not found");
  }

  return reservation;
};
