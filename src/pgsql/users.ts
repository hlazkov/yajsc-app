import { executeQuery } from './pgConnection.ts';
import { validateUserBody } from '../api/validators.ts';
import { User } from '../api/types.ts';

export const selectAllUsers = async (): Promise<User[]> => {
  const result = await executeQuery(
    `SELECT id, username, role_id, firstname, lastname, phone, email, telegram FROM public.users;`,
  );
  return result.rows.map(row => ({
    id: row['id'],
    username: row['username'],
    roleId: row['role_id'],
    firstName: row['firstname'],
    lastName: row['lastname'],
    phoneNumber: row['phone'],
    email: row['email'],
    telegram: row['telegram'],
  }));
};

export const selectUserById = async (id: string): Promise<User | undefined> => {
  const result = await executeQuery(
    `SELECT id, username, role_id, firstname, lastname, phone, email, telegram FROM public.users WHERE id='${id}'::uuid;`,
  );
  if (!result.rows || result.rows.length === 0) return undefined;
  else
    return {
      id: result.rows[0]['id'],
      username: result.rows[0]['username'],
      roleId: result.rows[0]['role_id'],
      firstName: result.rows[0]['firstname'],
      lastName: result.rows[0]['lastname'],
      phoneNumber: result.rows[0]['phone'],
      email: result.rows[0]['email'],
      telegram: result.rows[0]['telegram'],
    };
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

export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await executeQuery(`DELETE FROM public.users WHERE id='${id}'::uuid;`);
  return !!result.rowCount && result.rowCount > 0;
};
