import express from 'express';
import pool from '../config/db';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, contact, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, contact, password)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstName, lastName, email, contact, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

export default router;
