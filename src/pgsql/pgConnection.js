import pg from 'pg';

const options = {
    user: process.env.PGUSER || 'postgres',
    database: process.env.PGDATABASE || 'postgres',
    password: process.env.PGPASSWORD || 'password',
    port: process.env.PGPORT || 5432,
    host: process.env.PGHOST || 'localhost',
}

export const client = new pg.Client(options);

export const executeQuery = async (query) => {
    return await client.query(query);
}


