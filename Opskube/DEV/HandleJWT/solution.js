import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Mock database (replace with real DB query in production)
const users = [
  {
    id: 1,
    username: 'john_doe',
    // password: "mypassword" (hashed version)
    password: '$2b$10$h/sr3o1FDPs.tEV2AcExQOiEhI7u2glUXKgi9/3QwF5uE0ZyV1b/m'
  }
];

const app = express();
app.use(express.json());

// Secret key for signing JWT
const JWT_SECRET = 'super_secret_key';

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // 1. Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  // 2. Find user in DB (here mocked)
  const user = users.findOne(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // 3. Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // 4. Generate JWT (expires in 1h)
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' } // 1 hour
  );

  // 5. Send token
  res.json({ token });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
