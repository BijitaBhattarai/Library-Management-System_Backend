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
import { createNotification } from "../services/notification.js"; // ✅ Import notification service

const RESERVATION_ROUTER = Router();

/**
 * POST /reservations
 * Reserve a book and create notification
 */
RESERVATION_ROUTER.post(
  "/",
  useValidator(CreateReservationValidator),
  async (req, res, next) => {
    try {
      const reservation = await reserveBook({
        userId: req.user.userId,
        bookId: req.body.bookId,
      });

      // 🔔 Create notification
      await createNotification({
        userId: req.user.userId,
        message: `Your reservation for book "${reservation.book}" is successful.`,
        type: "RESERVATION",
      });

      res.status(201).json({
        success: true,
        reservation,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PATCH /reservations/:reservationId/cancel
 * Cancel reservation and create notification
 */
RESERVATION_ROUTER.patch(
  "/:reservationId/cancel",
  useValidator(UpdateReservationValidator),
  async (req, res, next) => {
    try {
      const reservation = await cancelReservation(req.params.reservationId);

      // 🔔 Create notification
      await createNotification({
        userId: reservation.user, // assuming reservation.user stores the user's id
        message: `Your reservation for book "${reservation.book}" has been cancelled.`,
        type: "RESERVATION",
      });

      res.status(200).json({
        success: true,
        reservation,
      });
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
    res.status(200).json({
      success: true,
      reservations,
    });
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
    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    next(error);
  }
});

export default RESERVATION_ROUTER;
