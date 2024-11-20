import {connect, Client} from 'ts-postgres';
import 'dotenv/config';

export class DBClient {
    private static client: Client | undefined;

    private static async getClient(): Promise<Client> {
        if (!this.client)
            this.client = await connect({
                host: process.env.PGHOST,
                port: Number(process.env.PGPORT),
                user: process.env.PGUSER,
                password: process.env.PGPASSWORD,
                database: process.env.PGDATABASE,
            });
        return this.client;
    }

    static async shutdown() {
        if (this.client) {
            await this.client.end();
            this.client = undefined;
        }
    }

    static async query(query: string) {
        const client = await this.getClient();
        return client.query(query);
    }
}

// export class DBClient {
//     protected client: Client;
//
//     constructor(client: Client) {
//         this.client = client;
//     }
//
//     public static async createAndConnectClient() {
//         return connect({
//             host: process.env.PGHOST,
//             port: Number(process.env.PGPORT),
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//     }
//
// }