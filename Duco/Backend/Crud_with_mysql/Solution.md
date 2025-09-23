
```js
// db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create a connection pool for efficient handling of multiple queries
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "inventory_user",
  password: process.env.DB_PASSWORD || "invent0ry_p@ss",
  database: process.env.DB_NAME || "shop_easy_inventory",
  waitForConnections: true,
  connectionLimit: 10, // adjust based on expected load
  queueLimit: 0,
});

export default pool;
```

### Example Usage (CRUD operations):

```js
// product.repository.js
import pool from "./db.js";

// CREATE
export async function addProduct({ name, price, quantity }) {
  const [result] = await pool.execute(
    `INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)`,
    [name, price, quantity]
  );
  return result.insertId;
}

// READ
export async function getProductById(productId) {
  const [rows] = await pool.execute(
    `SELECT * FROM products WHERE id = ?`,
    [productId]
  );
  return rows[0];
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
```

---

✅ **Best practices applied here:**

* Used **connection pooling** instead of a single connection.
* Used **async/await** for clean asynchronous handling.
* Used **parameterized queries (`?`)** to prevent SQL injection.
* Externalized credentials with **dotenv** (fallbacks for default values).

