import { config } from '../config.ts';
import Pool from 'pg-pool';

const pool = new Pool(config.db);

export const executeQuery = async (query: string, values?: any[]) => {
  const client = await pool.connect();
  try {
    return await client.query(query, values);
  } finally {
    client.release();
  }
};
