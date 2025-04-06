import express from 'express';
import fs from 'fs';

const router = express.Router();

// 📄 GET paginated bids (optionally by productId)
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;
  const productId = parseInt(req.query.productId); // opcjonalnie

  fs.readFile('./db/bids.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading bids');

    const jsonData = JSON.parse(data);
    let bids = jsonData.bids;

    if (!isNaN(productId)) {
      bids = bids.filter(b => b.productId === productId);
    }

    const start = page * perPage;
    const end = start + perPage;
    const result = bids.slice(start, end);

    res.status(200).json({
      items: result,
      total: bids.length,
      page,
      perPage,
      totalPages: Math.ceil(bids.length / perPage),
    });
  });
});

// 🔍 GET all bids for given productId
router.get('/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
  
    fs.readFile('./db/bids.json', 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading bids');
  
      const jsonData = JSON.parse(data);
      const bids = jsonData.bids.filter(b => b.productId === productId);
  
      res.status(200).json(bids); // <-- zwracamy tablicę bids[]
    });
  });
  

// ➕ POST new bid
router.post('/', (req, res) => {
  const { productId, userId, userName, avatar, amount } = req.body;

  if (!productId || !userId || !userName || !amount) {
    return res.status(400).json({ message: 'Missing required bid data' });
  }

  fs.readFile('./db/bids.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading bids');

    const jsonData = JSON.parse(data);
    const maxId = jsonData.bids.reduce((max, bid) => Math.max(max, bid.id), 0);

    const newBid = {
      id: maxId + 1,
      productId,
      userId,
      userName,
      avatar: avatar || null,
      amount,
      createdAt: new Date().toISOString(),
    };

    jsonData.bids.push(newBid);

    fs.writeFile('./db/bids.json', JSON.stringify(jsonData, null, 2), err => {
      if (err) return res.status(500).send('Error saving bid');
      res.status(201).json(newBid);
    });
  });
});

export default router;
