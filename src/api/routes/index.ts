import express from 'express';
import { client } from '../../pgsql/pgConnection.ts';
import { message } from '../../utils.ts';

export const router = express.Router();

router.post('/test', async function (req, res) {
  try {
    const result = await client.query(req.body.query);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(message(`Failed to do something. Error: ${e}`));
  }
});
