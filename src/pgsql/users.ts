import { executeQuery } from './pgConnection.ts';
import { validateUserBody } from '../api/validators.ts';
import { User } from '../api/types.ts';

export const selectAllUsers = async () => {
  return await executeQuery(
    `SELECT id, username, role_id, firstname, lastname, phone, email, telegram, curator_id FROM public.users;`,
  );
};

export const selectUserById = async (id: string) => {
  return await executeQuery(
    `SELECT id, username, role_id, firstname, lastname, phone, email, telegram, curator_id FROM public.users WHERE id='${id}'::uuid;`,
  );
};

export const insertUser = async (user: object, id: string) => {
  const normalizedUser: User = {
    id,
    firstName: 'anonymous',
    lastName: 'anononovich',
    ...validateUserBody(user),
  };
  const query = `INSERT INTO public.users
        (id, username, role_id, firstname, lastname, phone, email, telegram)
        VALUES('${normalizedUser.id}'::uuid, '${normalizedUser.username}', '${normalizedUser.roleId}'::uuid, '${normalizedUser.firstName || 'NULL'}', '${normalizedUser.lastName || 'NULL'}', '${normalizedUser.phoneNumber || 'NULL'}', '${normalizedUser.email || 'NULL'}', '${normalizedUser.telegram || 'NULL'}');`;
  // TODO remove this once we don't need it
  console.debug(query);
  return await executeQuery(query);
};
/**
 * INSERT INTO public.users
 * (id, username, role_id, firstname, lastname, phone, email, telegram, curator_id)
 * VALUES(?, '', ?, '', '', '', '', '', ?);
 */

export const deleteUser = async (id: string) => {
  return await executeQuery(`DELETE FROM public.users WHERE id='${id}'::uuid;`);
};
