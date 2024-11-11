import express from 'express';
import { message, uuid } from '../../utils.ts';
import { validateId, ValidationError } from '../validators.ts';
import { isStudent } from '../../cached/rolesCache.ts';
import { db } from '../../pgsql/db.helper.ts';

export const usersRouter = express.Router();

usersRouter.get('/list', async (req, res) => {
  try {
    const data = await db.users.selectAll();
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json(message(`Failed to get users. Error: ${e}`));
  }
});

usersRouter.post('/', async (req, res) => {
  const user = req.body;
  const id = uuid();

  try {
    await db.users.insert(user, id);

    if (await isStudent(user.roleId)) {
      await db.homeworkStatus.insert(id, uuid());
      res.status(200).json({ data: { id, ...user } });
    } else res.status(200).json({ data: { id, ...user } });
  } catch (e) {
    if (e instanceof ValidationError) res.status(400).json(message(`Invalid user body: ${e}`));
    else res.status(500).json(message(`Failed to post user. Error: ${e}`));
  }
});

usersRouter.get('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    id = validateId(req.params.id);

    const data = await db.users.selectOne(id);

    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json(message(`User by id=${id} not found.`));
    }
  } catch (e) {
    if (e instanceof ValidationError) res.status(400).json(message(`Invalid id: ${e}`));
    else res.status(500).json(message(`Failed to get user by id=${id}. Error: ${e}`));
  }
});

usersRouter.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    id = validateId(req.params.id);

    // removing related homework status
    const roleId = await db.users.getRole(id);
    if (await isStudent(roleId)) {
      await db.homeworkStatus.deleteByUserId(id);
    }
    const result = await db.users.deleteOne(id);

    if (result) {
      res.status(200).json(message(`User with id=${id} deleted successfully.`));
    } else {
      res.status(404).json(message(`User by id=${id} not found.`));
    }
  } catch (e) {
    if (e instanceof ValidationError) res.status(400).json(message(`Invalid id: ${e}`));
    else res.status(500).json(message(`Failed to delete user by id=${id}. Error: ${e}`));
  }
});

usersRouter.get('/:userId/homeworkStatus', async function (req, res) {
  try {
    const userId = validateId(req.params.userId);
    const result = await db.homeworkStatus.selectOne(userId);

    res.status(200).json({ data: result });
  } catch (e) {
    if (e instanceof ValidationError) res.status(400).json(message(`Invalid id: ${e}`));
    else
      res
        .status(500)
        .json(message(`Failed to retrieve homeworkStatus for user with id=${req.params.userId}. Error: ${e}`));
  }
});

// TODO should be performed by admin/mentor!!
usersRouter.get('/:userId/moveToThread/:threadId', async function (req, res) {
  try {
    const userId = validateId(req.params.userId);
    const threadId = validateId(req.params.threadId);
    const result = await db.homeworkStatus.setThreadId(userId, threadId);

    res.status(200).json({ data: result });
  } catch (e) {
    if (e instanceof ValidationError) res.status(400).json(message(`Invalid id: ${e}`));
    else
      res
        .status(500)
        .json(
          message(
            `Failed to move user with id=${req.params.userId} to thread with id=${req.params.threadId}. Error: ${e}`,
          ),
        );
  }
});
