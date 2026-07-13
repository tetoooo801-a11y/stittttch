import { Router } from "express";
import {
  getServices,
  getServicesByCategory,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getServices);
router.get("/category/:category", getServicesByCategory);
router.get("/:id", getServiceById);
router.post("/", authMiddleware, adminMiddleware, createService);
router.patch("/:id", authMiddleware, adminMiddleware, updateService);
router.delete("/:id", authMiddleware, adminMiddleware, deleteService);

export default router;