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
      user
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

    fs.readFile('./db/users.json', 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading user data');

      const users = JSON.parse(data).users;
      const user = users.find(u => u.id === decoded.id);

      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json(user); // ✅ cały user, łącznie z role, name itd.
    });
  } catch (e) {
    res.status(403).json({ message: 'Invalid token' });
  }
});



router.get('/users', (req, res) => {
  fs.readFile('./db/users.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');

    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData.users); // Zwraca listę użytkowników
  });
});

// PATCH – aktywuj/dezaktywuj użytkownika


router.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedFields = req.body;

  fs.readFile('./db/users.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');

    const jsonData = JSON.parse(data);
    const index = jsonData.users.findIndex(user => user.id === id);

    if (index === -1) return res.status(404).json({ message: 'User not found' });

    // Nadpisujemy tylko przekazane pola
    jsonData.users[index] = {
      ...jsonData.users[index],
      ...updatedFields,
    };

    fs.writeFile('./db/users.json', JSON.stringify(jsonData, null, 2), err => {
      if (err) return res.status(500).send('Error saving data');
      res.status(200).json(jsonData.users[index]);
    });
  });
});
// DELETE – usuń użytkownika
router.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile('./db/users.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');

    const jsonData = JSON.parse(data);
    const index = jsonData.users.findIndex(user => user.id === id);

    if (index === -1) return res.status(404).json({ message: 'User not found' });

    const deletedUser = jsonData.users.splice(index, 1)[0];

    fs.writeFile('./db/users.json', JSON.stringify(jsonData, null, 2), err => {
      if (err) return res.status(500).send('Error saving data');
      res.status(200).json({ message: 'User deleted', user: deletedUser });
    });
  });
});




router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
