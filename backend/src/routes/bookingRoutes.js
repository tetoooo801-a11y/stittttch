import { Router } from "express";
import {
  createBooking,
  getBooking,
  updateBooking,
  confirmBooking,
  getMyBookings,
  getAllBookings,
  rejectBooking,
} from "../controllers/bookingController.js";
import { authMiddleware, optionalAuth, adminMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/errorMiddleware.js";
import { bookingValidation } from "../validators/index.js";

const router = Router();

router.post("/", optionalAuth, bookingValidation, validate, createBooking);
router.get("/me", authMiddleware, getMyBookings);
router.get("/admin/all", authMiddleware, adminMiddleware, getAllBookings);
router.get("/:id", getBooking);
router.patch("/:id", updateBooking);
router.post("/:id/confirm", confirmBooking);
router.post("/:id/reject", authMiddleware, adminMiddleware, rejectBooking);

export default router;