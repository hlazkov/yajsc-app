import express from 'express';
import { usersData } from '../../../data/users.js';
import { UUID_regexp, error, uuid, getIdsFromPath } from '../../utils.js';

export const router = express.Router();

router.get('/list', function(req, res, next) {
  const users = usersData.read();
  res.status(200).json(users);
});

router.post('/', function(req, res, next) {
  const user = req.body;
  const id = uuid();

  const users = usersData.read();
  users.push({id, ...user})
  usersData.write(users);

  res.status(200).json({id, ...user});
});

router.get(UUID_regexp, function(req, res, next) {
  const id = getIdsFromPath(req.path).pop();
  
  const users = usersData.read();
  const user = users.find(user => user.id === id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json(error(`User with id = ${id} was not found :(`));
  }
});

router.delete(UUID_regexp, function(req, res, next) {
  const id = getIdsFromPath(req.path).pop();
  
  const users = usersData.read();
  const user = users.find(user => user.id === id);

  if (user) {
    users.splice(users.indexOf(user), 1);
    usersData.write(users);
    
    res.status(200).json({result: 'Done!'});
  } else {
    res.status(404).json(error(`User with id = ${id} was not found :(`));
  }
});

// module.exports = router;
