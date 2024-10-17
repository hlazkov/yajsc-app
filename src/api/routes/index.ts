import express from 'express';
import { message } from '../../utils.ts';
import { executeQuery } from '../../pgsql/pgConnection.ts';

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
    const result = await executeQuery(req.body.query);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(message(`Failed to do something. Error: ${e}`));
  }
});
