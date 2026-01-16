import Router from "express";
import {
  reserveBook,
  cancelReservation,
  getAllReservations,
  getReservationById,
} from "../services/reservation.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  CreateReservationValidator,
  UpdateReservationValidator,
} from "../validators/reservationValidator.js";
import useValidator from "../middleware/useValidator.js";

/**
 * POST /reservations
 * Reserve a book
 */
const RESERVATION_ROUTER = Router();
RESERVATION_ROUTER.post(
  "/",
  useValidator(CreateReservationValidator),
  async (req, res, next) => {
    try {
      const reservation = await reserveBook({
        userId: req.user.userId,
        bookId: req.body.bookId,
      });

      res.status(201).json(reservation);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PATCH /reservations/:reservationId/cancel
 */
RESERVATION_ROUTER.patch(
  "/:reservationId/cancel",
  useValidator(UpdateReservationValidator),
  async (req, res, next) => {
    try {
      const reservation = await cancelReservation(req.params.reservationId);

      res.status(200).json(reservation);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /reservations
 */
RESERVATION_ROUTER.get("/", async (req, res, next) => {
  try {
    const reservations = await getAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /reservations/:reservationId
 */
RESERVATION_ROUTER.get("/:reservationId", async (req, res, next) => {
  try {
    const reservation = await getReservationById(req.params.reservationId);
    res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
});

export default RESERVATION_ROUTER;
