import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  seedProducts,
  updateProductStock,
} from "../controllers/products.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", auth, createProduct);
router.post("/seed", auth, seedProducts);
router.patch("/:id/stock", auth, updateProductStock);
router.delete("/:id", auth, deleteProduct);

export default router;
