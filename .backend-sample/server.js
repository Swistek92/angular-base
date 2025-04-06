import express from 'express';
import cors from 'cors';
import fs from 'fs';
import authRoutes from './routes/auth.routes.js';
import clothesRoutes from './routes/clothes.routes.js';
import bidsRoutes from './routes/bids.routes.js';

const app = express();
const port = 3000;

// CORS setup
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 204,
  methods: 'GET, POST, PUT, DELETE',
};

app.use(cors(corsOptions));
app.use(express.json());

// Routers
app.use('/auth', authRoutes);
app.use('/clothes', clothesRoutes);
app.use('/bids', bidsRoutes);

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
