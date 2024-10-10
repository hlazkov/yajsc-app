import express from 'express';
import { client } from '../pgsql/dbInit.js';

export const router = express.Router();

router.post('/test', async function(req, res, next) {
  try {
    const result = await client.query(req.body.query);
    res.status(200).json({result});
  } catch (e) {
    res.status(500).json({error: e.toString()});
  }
});
