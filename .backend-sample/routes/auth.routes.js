import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from '../utils/jwt.js';
import e from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  fs.readFile('./db/users.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');

    const users = JSON.parse(data).users;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email }
    });
  });
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Missing refresh token' });

  jwt.verify(refreshToken, 'myrefreshkey', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
});

router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = verifyAccessToken(token);
    res.json({ id: decoded.id, email: decoded.email });
  } catch (e) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
