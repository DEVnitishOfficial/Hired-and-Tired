import pool from "./db.js";

// CREATE
export async function addProduct({ name, price, quantity }) {
  const [result] = await pool.execute(
    `INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)`,
    [name, price, quantity]
  );
  console.log('see the result',result)
  return result.insertId;
}

// READ
export async function getProductById(productId) {
  const [rows] = await pool.execute(
    `SELECT * FROM products WHERE id = ?`,
    [productId]
  );

  console.log('see rows',[rows])

  return rows[0];
}

export async function getAllProducts() {
  const [rows] = await pool.execute(`SELECT * FROM products`);
  return rows;
}

// UPDATE
export async function updateProductQuantity(productId, newQuantity) {
  const [result] = await pool.execute(
    `UPDATE products SET quantity = ? WHERE id = ?`,
    [newQuantity, productId]
  );
  return result.affectedRows;
}

// DELETE
export async function deleteProduct(productId) {
  const [result] = await pool.execute(
    `DELETE FROM products WHERE id = ?`,
    [productId]
  );
  return result.affectedRows;
}
