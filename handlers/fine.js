import Router from "express";
import {
  createFine,
  deleteFine,
  getAllFines,
  getFineById,
  payFine,
} from "../services/fine.js";
import useValidator from "../middleware/useValidator.js";
import {
  CreateFineValidator,
  UpdateFineValidator,
} from "../validators/fineValidator.js";
import { createNotification } from "../services/notification.js";

const FINE_ROUTER = Router();
FINE_ROUTER.post(
  "/",
  useValidator(CreateFineValidator),
  async (req, res, next) => {
    try {
      const fine = await createFine({
        issueId: req.body.issueId,
        userId: req.user.userId, // taken from JWT
        amount: req.body.amount,
      });
      await createNotification({
        userId: req.user.userId,
        message: `A fine of Rs.${fine.amount} has been applied to your account.`,
        type: "OVERDUE",
      });

      res.status(201).json({ success: true, fine });
    } catch (error) {
      next(error);
    }
  }
);

FINE_ROUTER.patch(
  "/:fineId/pay",
  useValidator(UpdateFineValidator),
  async (req, res, next) => {
    try {
      const fine = await payFine(req.params.fineId);
      await createNotification({
        userId: fine.user, // assuming `fine.user` contains the userId
        message: `Your fine of Rs.${fine.amount} has been paid successfully.`,
        type: "SYSTEM",
      });
      res.status(200).json({ success: true, fine });
    } catch (error) {
      next(error);
    }
  }
);

FINE_ROUTER.get("/", async (req, res, next) => {
  try {
    const fines = await getAllFines();
    res.status(200).json({ success: true, fines });
  } catch (error) {
    next(error);
  }
});

FINE_ROUTER.get("/:fineId", async (req, res, next) => {
  try {
    const fine = await getFineById(req.params.fineId);
    res.status(200).json({ success: true, fine });
  } catch (error) {
    next(error);
  }
});

FINE_ROUTER.delete("/:fineId", async (req, res, next) => {
  try {
    const fine = await deleteFine(req.params.fineId);
    res.status(200).json({ success: true, message: "Fine deleted", fine });
  } catch (error) {
    next(error);
  }
});

export default FINE_ROUTER;
