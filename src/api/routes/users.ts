import express from 'express';
import { message, uuid } from '../../utils.ts';
import { deleteUser, insertUser, selectAllUsers, selectUserById } from '../../pgsql/users.ts';
import { validateId, ValidationError } from '../validators.ts';

export const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const result = await selectAllUsers();
    res.status(200).json(result.rows);
  } catch (e) {
    res.status(500).json(message(`Failed to get users. Error: ${e}`));
  }
});

router.post('/', async (req, res) => {
  const user = req.body;
  const id = uuid();

  try {
    await insertUser(user, id);
    res.status(200).json({ id, ...user });
  } catch (e) {
    if (e instanceof ValidationError) res.status(401).json(message(`Invalid user body: ${e}`));
    else res.status(500).json(message(`Failed to post user. Error: ${e}`));
  }
});

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    id = validateId(req.params.id);

    const result = await selectUserById(id);

    if (result.rows.length) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json(message(`User by id=${id} not found.`));
    }
  } catch (e) {
    if (e instanceof ValidationError) res.status(401).json(message(`Invalid id: ${e}`));
    else res.status(500).json(message(`Failed to get user by id=${id}. Error: ${e}`));
  }
});

router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    id = validateId(req.params.id);

    const result = await deleteUser(id);

    if (!!result.rowCount && result.rowCount > 0) {
      res.status(200).json(message(`User with id=${id} deleted successfully.`));
    } else {
      res.status(404).json(message(`User by id=${id} not found.`));
    }
  } catch (e) {
    if (e instanceof ValidationError) res.status(401).json(message(`Invalid id: ${e}`));
    else res.status(500).json(message(`Failed to delete user by id=${id}. Error: ${e}`));
  }
});
