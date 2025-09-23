import {
  addProduct,
  getProductById,
  getAllProducts,
  updateProductQuantity,
  deleteProduct,
} from "./product.repository.js";

// CREATE
export async function createProduct(req, res) {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const productId = await addProduct({ name, price, quantity });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: {
        id: productId,
        name,
        price,
        quantity,
      },
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// READ
export async function fetchProduct(req, res) {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetchAllProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// UPDATE
export async function modifyProductQuantity(req, res) {
  try {
    const { quantity } = req.body;
    const rows = await updateProductQuantity(req.params.id, quantity);
    if (!rows) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// DELETE
export async function removeProduct(req, res) {
  try {
    const rows = await deleteProduct(req.params.id);
    if (!rows) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
