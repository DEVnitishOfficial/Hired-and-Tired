import { Router } from "express";
import {
  createProduct,
  fetchAllProducts,
  fetchProduct,
  modifyProductQuantity,
  removeProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/create", createProduct);              // Create
router.get("/getAll", fetchAllProducts);            // Read all
router.get("/getById/:id", fetchProduct);             // Read one
router.put("/updateById/:id", modifyProductQuantity);    // Update
router.delete("/removeById/:id", removeProduct);         // Delete

export default router;
