import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import User from '../models/User.js';

const router = express.Router();

const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_PASSWORD = 'admin123';
const DEFAULT_ADMIN_PASSWORD_HASH = bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, 10);
const DEFAULT_JWT_SECRET = 'deurali-super-secret';

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

    const validUsername = process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME;
    const validPasswordHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;
    const validJwtSecret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;

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
      validJwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({ token, expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// POST /register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      const validJwtSecret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
      const token = jwt.sign(
        { id: user._id, role: user.role },
        validJwtSecret,
        { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
      );

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

export default router;

