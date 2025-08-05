import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// DB connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'eduzone',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// /search-courses?query=python&sortBy=title
app.get('/search-courses', async (req, res) => {
  try {
    const { query = '', sortBy = 'title' } = req.query;

    const validSortColumns = {
      title: 'c.title',
      instructor: 'i.name'
    };
    const sortColumn = validSortColumns[sortBy.toLowerCase()] || 'c.title';

    const [rows] = await pool.query(
      `
      SELECT 
        c.course_id,
        c.title,
        c.description,
        c.category,
        i.name AS instructor_name,
        COUNT(e.enrollment_id) AS student_count
      FROM courses c
      JOIN instructors i ON c.instructor_id = i.instructor_id
      LEFT JOIN enrollments e ON c.course_id = e.course_id
      WHERE 
        LOWER(c.title) LIKE ? OR
        LOWER(c.category) LIKE ? OR
        LOWER(i.name) LIKE ?
      GROUP BY c.course_id, i.name
      ORDER BY ${sortColumn} ASC
      `,
      [`%${query.toLowerCase()}%`, `%${query.toLowerCase()}%`, `%${query.toLowerCase()}%`]
    );

    res.json({ courses: rows });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`EduZone API listening at http://localhost:${port}`);
});
