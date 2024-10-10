import express from 'express';
import { error, uuid } from '../../utils.js';
import {deleteUser, insertUser, selectAllUsers, selectUserById} from "../../pgsql/users.js";

export const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const result = await selectAllUsers();
    res.status(200).json(result.rows);
  } catch (e) {
    res.status(500).json(error(`Failed to get users. Error: ${e}`));
  }
});

router.post('/', async (req, res) => {
  const user = req.body;
  const id = uuid();

  try {
    const result = await insertUser(user, id);
    res.status(200).json({id, ...user});
  } catch (e) {
    res.status(500).json(error(`Failed to post user. Error: ${e}`));
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await selectUserById(id);
    if (result.rows.length) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json(error(`User by id=${id} not found.`));
    }
  } catch (e) {
    res.status(500).json(error(`Failed to get user by id=${id}. Error: ${e}`));
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await deleteUser(id);
    if (result.rows.length) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json(error(`User by id=${id} not found.`));
    }
  } catch (e) {
    res.status(500).json(error(`Failed to delete user by id=${id}. Error: ${e}`));
  }
});