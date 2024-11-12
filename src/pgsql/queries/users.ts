import { executeQuery } from '../pgConnection.ts';
import { validateUserBody } from '../../api/validators.ts';
import { User } from '../../api/types.ts';

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
    firstName: '_default',
    lastName: '_default',
    ...validateUserBody(user),
  };
  const query = `INSERT INTO public.users
        (id, role_id, username, firstname, lastname, phone, email, telegram)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;
  return await executeQuery(query, [
    normalizedUser.id,
    normalizedUser.roleId,
    normalizedUser.username,
    normalizedUser.firstName,
    normalizedUser.lastName,
    normalizedUser.phoneNumber,
    normalizedUser.email,
    normalizedUser.telegram,
  ]);
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await executeQuery(`DELETE FROM public.users WHERE id='${id}'::uuid;`);
  return !!result.rowCount && result.rowCount > 0;
};

export const getUsersRoleIdById = async (id: string): Promise<string> => {
  const result = await executeQuery(`SELECT role_id FROM public.users WHERE id='${id}';`);
  return result.rows[0]['role_id'];
};
