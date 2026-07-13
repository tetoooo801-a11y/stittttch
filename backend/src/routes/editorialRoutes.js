import { Router } from "express";
import {
    getEditorials,
    getEditorialBySlug,
    createEditorial,
    updateEditorial,
    deleteEditorial,
} from "../controllers/editorialController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getEditorials);
router.get("/:slug", getEditorialBySlug);
router.post("/", authMiddleware, adminMiddleware, createEditorial);
router.patch("/:id", authMiddleware, adminMiddleware, updateEditorial);
router.delete("/:id", authMiddleware, adminMiddleware, deleteEditorial);

export default router;