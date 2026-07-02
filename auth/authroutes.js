import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Limit login attempts to slow down brute-force guessing.
// 10 attempts per 15 minutes per IP is generous for a real admin,
// painfully slow for someone trying to guess a password.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const validUsername = process.env.ADMIN_USERNAME;
    const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!validUsername || !validPasswordHash) {
      console.error('ADMIN_USERNAME or ADMIN_PASSWORD_HASH is not set in environment variables.');
      return res.status(500).json({ message: 'Server auth is not configured' });
    }

    // Compare username first; if it fails we still run bcrypt.compare against
    // a dummy hash so that the response time doesn't reveal whether the
    // username was correct (a basic defense against username enumeration).
    const usernameMatches = username === validUsername;
    const passwordMatches = await bcrypt.compare(
      password,
      usernameMatches ? validPasswordHash : '$2b$10$invalidsaltinvalidsaltinvalidsaltuO'
    );

    if (!usernameMatches || !passwordMatches) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { username: validUsername, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({ token, expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;