import { executeQuery } from '../pgConnection.ts';

import { Role } from '../../api/types.ts';

export const selectAllRoles = async (): Promise<Role[]> => {
  const result = await executeQuery(`SELECT * FROM public.roles;`);
  return result.rows;
};
