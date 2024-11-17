import { connect, Client } from 'ts-postgres';
import 'dotenv/config';

export class DBClient {
    protected client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public static async createAndConnectClient() {
        return connect({
            host: process.env.PGHOST,
            port: Number(process.env.PGPORT),
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
        });
    }

}