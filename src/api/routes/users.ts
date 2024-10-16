import express from 'express';
import { message, uuid } from '../../utils.ts';
import { deleteUser, insertUser, selectAllUsers, selectUserById } from '../../pgsql/users.ts';
import { validateId, ValidationError } from '../validators.ts';

export const usersRouter = express.Router();

/**
 * @openapi
 * /users/list:
 *   get:
 *     summary: Get users list
 *     description: Returns a list of existing users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: uuid
 *                         description: The user ID.
 *                       username:
 *                         type: string
 *                         description: The user's name.
 *                         example: admin
 *                       roleId:
 *                         type: uuid
 *                         description: The user role ID.
 *                       firstName:
 *                         type: string
 *                         description: The user's first name.
 *                         example: Johnnie
 *                       lastName:
 *                         type: string
 *                         description: The user's last name.
 *                         example: Doe
 *                       phoneNumber:
 *                         type: string
 *                         description: The user's phone number.
 *                         example: +380123456789
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: johnniedoe@gmail.com
 *                       telegram:
 *                         type: string
 *                         description: The user's telegram username.
 */
usersRouter.get('/list', async (req, res) => {
  try {
    const data = await selectAllUsers();
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json(message(`Failed to get users. Error: ${e}`));
  }
});

/**
 * @openapi
 * /users/:
 *   post:
 *     summary: Adds a new user
 *     description: Adds a new user.
 */
usersRouter.post('/', async (req, res) => {
  const user = req.body;
  const id = uuid();

  try {
    await insertUser(user, id);
    res.status(200).json({ data: { id, ...user } });
  } catch (e) {
    if (e instanceof ValidationError) res.status(401).json(message(`Invalid user body: ${e}`));
    else res.status(500).json(message(`Failed to post user. Error: ${e}`));
  }
});

/**
 * @openapi
 * /users/:id:
 *   get:
 *     summary: Returns a user by specified ID
 *     description: Returns a user by specified ID.
 */
usersRouter.get('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    id = validateId(req.params.id);

    const data = await selectUserById(id);

    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json(message(`User by id=${id} not found.`));
    }
  } catch (e) {
    if (e instanceof ValidationError) res.status(401).json(message(`Invalid id: ${e}`));
    else res.status(500).json(message(`Failed to get user by id=${id}. Error: ${e}`));
  }
});

/**
 * @openapi
 * /users/:id:
 *   delete:
 *     summary: Removes a user by specified ID
 *     description: Removes a user by specified ID.
 */
usersRouter.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    id = validateId(req.params.id);

    const result = await deleteUser(id);

    if (result) {
      res.status(200).json(message(`User with id=${id} deleted successfully.`));
    } else {
      res.status(404).json(message(`User by id=${id} not found.`));
    }
  } catch (e) {
    if (e instanceof ValidationError) res.status(401).json(message(`Invalid id: ${e}`));
    else res.status(500).json(message(`Failed to delete user by id=${id}. Error: ${e}`));
  }
});
