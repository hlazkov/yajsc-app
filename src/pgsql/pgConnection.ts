import pg from 'pg';
import { config } from '../config.ts';

export const client = new pg.Client(config.db);

export const executeQuery = async (query: string) => {
  return await client.query(query);
};
