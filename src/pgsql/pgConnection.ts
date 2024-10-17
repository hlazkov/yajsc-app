import { config } from '../config.ts';
import Pool from 'pg-pool';

const pool = new Pool(config.db);

export const createDbConnection = () => pool.connect();

export const executeQuery = async (query: string) => {
  return await pool.query(query);
};
