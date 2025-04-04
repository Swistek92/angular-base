import fs from 'fs';
import jwt from 'jsonwebtoken';

const PRIVATE_KEY = fs.readFileSync('./keys/private.key');
const PUBLIC_KEY = fs.readFileSync('./keys/public.key');

const TOKEN_EXPIRATION = '15m';
const REFRESH_EXPIRATION = '1d';
const REFRESH_SECRET = 'myrefreshkey';

export const generateAccessToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: TOKEN_EXPIRATION,
  });

export const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION });

export const verifyAccessToken = (token) =>
  jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
