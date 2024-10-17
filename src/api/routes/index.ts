import express from 'express';
import { message } from '../../utils.ts';
import { executeQuery } from '../../pgsql/pgConnection.ts';
import { config } from '../../config.ts';

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

/**
 * @openapi
 * /healthcheck:
 *   get:
 *     summary: check if I'm alive
 *     description: Just hit the button.
 */
indexRouter.get('/healthcheck', async function (req, res) {
  const data = { ...config };
  try {
    const result = await executeQuery(
      `SELECT table_schema || '.' || table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');`,
    );
    res.status(200).json({ ...data, tables: result.rows });
  } catch (e) {
    res.status(500).json(message(`Failed to do something. Error: ${e}`));
  }
});
