import { config } from '../config.ts';
import Pool from 'pg-pool';

const pool = new Pool(config.db);

export const createDbConnection = async () => {
  // const client = await pool.connect();
  // client.
  // debugger;
};

export const executeQuery = async (query: string) => {
  const client = await pool.connect();
  try {
    return await client.query(query);
  } finally {
    client.release();
  }
};
