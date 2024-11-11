import { Thread, User } from './types.ts';

export class ValidationError extends Error {}

export const validateId = (id: string | any, errorMessagePart = 'id') => {
  if (typeof id !== 'string') throw new ValidationError('id must be a string');
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return id;
  else throw new ValidationError(errorMessagePart + ' must be a valid uuid');
};

const minimalUsernameLength = 6;
const minimalNameLength = 6;

export const validateUserBody = (user: object | any) => {
  if (typeof user !== 'object') throw new ValidationError('user must be an object Oo (IDK how have we got here)');
  const result = {} as Omit<User, 'id'>;

  if (user.username && typeof user.username === 'string' && user.username.length >= minimalUsernameLength)
    result.username = user.username;
  else throw new ValidationError(`username must be valid string with length of ${minimalUsernameLength} or more`);

  if (user.roleId && typeof user.roleId === 'string' && !!validateId(user.roleId, 'roleId'))
    result.roleId = user.roleId;
  else throw new ValidationError(`roleId must be valid uuid`);

  const optionalString = ['firstName', 'lastName', 'phoneNumber', 'email', 'telegram'] as Array<keyof Omit<User, 'id'>>;

  for (const key of optionalString) {
    if (user[key] && typeof user[key] === 'string') result[key] = user[key];
  }

  return result as Omit<User, 'id'>;
};

export const validateThreadBody = (thread: object | any) => {
  if (typeof thread !== 'object') throw new ValidationError('thread must be an object Oo (IDK how have we got here)');
  const result = {} as Omit<Thread, 'id'>;

  if (thread.name && typeof thread.name === 'string' && thread.name.length >= minimalNameLength)
    result.name = thread.name;
  else throw new ValidationError(`name must be valid string with length of ${minimalNameLength} or more`);

  return result as Omit<Thread, 'id'>;
};
