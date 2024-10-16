import express from 'express';
import { client } from '../../pgsql/pgConnection.ts';
import { message } from '../../utils.ts';

export const indexRouter = express.Router();

/**
 * @openapi
 * /test:
 *   post:
 *     summary: post a query right to db
 *     description: Type a query and try it.
 */
indexRouter.post('/test', async function (req, res) {
  try {
    const result = await client.query(req.body.query);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(message(`Failed to do something. Error: ${e}`));
  }
});
