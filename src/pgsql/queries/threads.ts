import { executeQuery } from '../pgConnection.ts';
import { Thread } from '../../api/types.ts';
import { uuid } from '../../utils.ts';

export const selectAllThreads = async (): Promise<Thread[]> => {
  const result = await executeQuery(`SELECT * FROM public.thread;`);
  return result.rows;
};

export const insertThread = async (tread: Omit<Thread, 'id'>) => {
  const query = `INSERT INTO public.thread (id, name) VALUES($1, $2);`;
  return await executeQuery(query, [uuid(), tread.name]);
};

export const deleteThread = async (id: string): Promise<boolean> => {
  const result = await executeQuery(`DELETE FROM public.thread WHERE id=$1::uuid;`, [id]);
  return !!result.rowCount && result.rowCount > 0;
};

export const updateThreadId = async (userId: string, newThreadId: string) => {
  const result = await executeQuery(
    `UPDATE public.homeworks_status
    SET thread_id=$1::uuid
    WHERE user_id=$2::uuid;`,
    [newThreadId, userId],
  );
  return result.rows[0];
};
