import Product from "../models/product.model.js";

// CREATE
export async function createProduct(req, res) {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const product = await Product.create({ name, price, quantity });
    res.status(201).json({
        success : true,
        message : "products created successfully",
        data : product
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// READ ALL
export async function fetchAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// READ ONE
export async function fetchProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// UPDATE
export async function modifyProductQuantity(req, res) {
  try {
    const { quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// DELETE
export async function removeProduct(req, res) {
    console.log('req received in controller');
    console.log(req.params.id);
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    console.log('see the product', product);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
