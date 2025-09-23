import { Router } from "express";
import {
  createProduct,
  fetchProduct,
  fetchAllProducts,
  modifyProductQuantity,
  removeProduct,
} from "./product.controller.js";

const router = Router();

router.post("/create", createProduct);              // Create
router.get("/getall", fetchAllProducts);            // Read all
router.get("/fetchById/:id", fetchProduct);             // Read one
router.put("/updateById/:id", modifyProductQuantity);    // Update
router.delete("/removeById/:id", removeProduct);         // Delete

export default router;
