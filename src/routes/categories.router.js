import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.post("/", createCategory);

//opcional, modifica el registro completo
router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
