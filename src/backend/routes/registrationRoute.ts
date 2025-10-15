import express from 'express';
import pool from '../config/db';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, contact, password } = req.body;

  if (!firstName || !lastName || !email || !contact || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, contact, password)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstName, lastName, email, contact, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
  const errorMessage =
    err instanceof Error ? err.message : 'Unknown error occurred';

  console.error('❌ Registration error:', errorMessage);
  res.status(500).json({ error: 'Internal server error' });
}

});

export default router;
