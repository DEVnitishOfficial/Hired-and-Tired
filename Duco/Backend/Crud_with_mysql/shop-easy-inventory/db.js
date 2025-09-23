import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "inventory_user",
  password: process.env.DB_PASSWORD || "invent0ry_p@ss",
  database: process.env.DB_NAME || "shop_easy_inventory",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database connected successfully!");
    connection.release(); // release back to pool
  } catch (err) {
    console.error("❌ MySQL Database connection failed:", err.message);
    process.exit(1); // exit process if DB not available
  }
})();

export default pool;
