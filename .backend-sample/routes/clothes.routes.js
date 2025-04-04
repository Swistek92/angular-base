import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');

    const jsonData = JSON.parse(data);
    const start = page * perPage;
    const end = start + perPage;

    const result = jsonData.items.slice(start, end);
    res.status(200).json({
      items: result,
      total: jsonData.items.length,
      page,
      perPage,
      totalPages: Math.ceil(jsonData.items.length / perPage),
    });
  });
});

router.post('/', (req, res) => {
  const { image, name, price, rating } = req.body;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');

    const jsonData = JSON.parse(data);
    const maxId = jsonData.items.reduce((max, item) => Math.max(max, item.id), 0);

    const newItem = { id: maxId + 1, image, name, price, rating };
    jsonData.items.push(newItem);

    fs.writeFile('./db/db.json', JSON.stringify(jsonData), err => {
      if (err) return res.status(500).send('Error saving data');
      res.status(201).json(newItem);
    });
  });
});

export default router;
