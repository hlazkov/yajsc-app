import express from 'express';
import { message } from '../../utils.ts';
import { db } from '../../pgsql/db.helper.ts';
import { ThreadsCache } from '../../cached/threadsCache.ts';
import { validateId, validateThreadBody, ValidationError } from '../validators.ts';

export const threadsRouter = express.Router();

threadsRouter.get('/list', async function (req, res) {
  try {
    const result = await ThreadsCache.getInstance();
    res.status(200).json({ data: result });
  } catch (e) {
    res.status(500).json(message(`Failed to do something. Error: ${e}`));
  }
});

threadsRouter.post('/', async (req, res) => {
  const thread = req.body;

  try {
    const result = await db.threads.insertOne(validateThreadBody(thread));
    // Updating threads cache:
    await ThreadsCache.updateCache();

    res.status(200).json({ data: result.rows[0] });
  } catch (e) {
    if (e instanceof ValidationError) res.status(400).json(message(`Invalid thread body: ${e}`));
    else res.status(500).json(message(`Failed to post user. Error: ${e}`));
  }
});

threadsRouter.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    id = validateId(req.params.id);

    const result = await db.threads.deleteOne(id);
    // Updating threads cache:
    await ThreadsCache.updateCache();

    if (result) {
      res.status(200).json(message(`Thread with id=${id} deleted successfully.`));
    } else {
      res.status(404).json(message(`Thread by id=${id} not found.`));
    }
  } catch (e) {
    if (e instanceof ValidationError) res.status(400).json(message(`Invalid id: ${e}`));
    else res.status(500).json(message(`Failed to delete thread by id=${id}. Error: ${e}`));
  }
});
