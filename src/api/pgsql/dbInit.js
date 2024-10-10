import pg from 'pg';

const options = {
    user: process.env.DB_USERNAME || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
    host: process.env.DB_HOST || 'localhost',
}

export const client = new pg.Client(options);

export const executeQuery = async (query) => {
    const result = await client.query(query);
    return result.result.rows;
}


