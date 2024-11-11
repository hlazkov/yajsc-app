import { executeQuery } from '../pgConnection.ts';

export const insertHWStatus = async (userId: string, id: string) => {
  const query = `INSERT INTO public.homeworks_status
    (id, user_id, unit_0, unit_1, unit_2, unit_3, unit_4, unit_5, unit_6, unit_7, unit_8, unit_9, unit_10)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;
  return await executeQuery(query, [id, userId, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
};

export const deleteHWStatusByUserId = async (userid: string): Promise<boolean> => {
  const result = await executeQuery(`DELETE FROM public.homeworks_status WHERE user_id=$1::uuid;`, [userid]);
  return !!result.rowCount && result.rowCount > 0;
};

export const selectHomeworksStatusByUserId = async (userId: string): Promise<Partial<HWStatus> | undefined> => {
  const result = await executeQuery(`SELECT * FROM public.homeworks_status WHERE user_id=$1::uuid;`, [userId]);
  if (!result.rows || result.rows.length === 0) return undefined;
  else
    return {
      id: result.rows[0]['id'],
      userId: result.rows[0]['user_id'],
      threadId: result.rows[0]['thread_id'],
      unitStatus: [
        result.rows[0]['unit_0'],
        result.rows[0]['unit_1'],
        result.rows[0]['unit_2'],
        result.rows[0]['unit_3'],
        result.rows[0]['unit_4'],
        result.rows[0]['unit_5'],
        result.rows[0]['unit_6'],
        result.rows[0]['unit_7'],
        result.rows[0]['unit_8'],
        result.rows[0]['unit_9'],
        result.rows[0]['unit_10'],
      ],
    };
};

export interface HWStatus {
  id: string;
  userId: string;
  threadId: string;
  unitStatus: number[];
}
