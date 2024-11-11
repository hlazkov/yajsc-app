import express from 'express';
import { message } from '../../utils.ts';
import { db } from '../../pgsql/db.helper.ts';

export const rolesRouter = express.Router();

rolesRouter.get('/list', async function (req, res) {
  try {
    const result = await db.roles.selectAll();
    res.status(200).json({ data: result });
  } catch (e) {
    res.status(500).json(message(`Failed to do something. Error: ${e}`));
  }
});
