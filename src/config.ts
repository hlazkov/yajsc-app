export const defaultPort = '3000';

export const config = {
  port: process.env.PORT || defaultPort,
  db: {
    user: process.env.PGUSER || 'postgres',
    database: process.env.PGDATABASE || 'postgres',
    password: process.env.PGPASSWORD || 'password',
    port: Number.parseInt(process.env.PGPORT || '5432'),
    host: process.env.PGHOST || 'localhost',
  },
};
