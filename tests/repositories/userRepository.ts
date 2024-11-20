import {DBClient} from "../db-client/DBClient.ts";
import {IUser} from "../types.ts";

export class UserRepository{

    async selectAll(): Promise<IUser[]> {
        const dbRawResult =  (await DBClient.query("SELECT * FROM public.users"));

        const users = this.generateResultObject(dbRawResult);
        return (users === null) ? []: users as IUser[];
    }
    //
    // public async getUserByUsername(username: string): Promise<any> {
    //     const result = await this.client.query();
    //     return result.rows[0];
    // }

    async selectOne(id: string): Promise<IUser | null> {
        const dbRawResult =  (await DBClient.query(`SELECT * FROM public.users WHERE id = '${id}'`));
        const user = this.generateResultObject(dbRawResult);
        return (user === null) ? null : user[0] as IUser;
    }

    private generateResultObject(result: any): IUser[] | null {
        if (!result.rows || result.rows.length === 0) return null;
        else {
            return result.rows.map((row: any) => this.userFromRow(row)) as IUser[];
        }
    }

    private userFromRow(row: any): IUser {
        return {
            id: row[0],
            roleId: row[1],
            username: row[2],
            firstName: row[3],
            lastName: row[4],
            phoneNumber: row[5],
            email: row[6],
            telegram: row[7],
        };
    }
}





// import { Client } from 'ts-postgres';
// import {DBClient} from "../db-client/DBClient.ts";
// import {IUser} from "../types.ts";
//
// export class UserRepository extends DBClient{
//
//     constructor(client: Client) {
//         super(client);
//     }
//
//
//     async selectAll(): Promise<IUser[]> {
//         const dbRawResult =  (await this.client.query("SELECT * FROM public.users"));
//
//         const users = this.generateResultObject(dbRawResult);
//         return (users === null) ? []: users as IUser[];
//     }
//     //
//     // public async getUserByUsername(username: string): Promise<any> {
//     //     const result = await this.client.query();
//     //     return result.rows[0];
//     // }
//
//     async selectOne(id: string): Promise<IUser | null> {
//         const dbRawResult =  (await this.client.query(`SELECT * FROM public.users WHERE id = '${id}'`));
//         const user = this.generateResultObject(dbRawResult);
//         return (user === null) ? null : user[0] as IUser;
//     }
//
//     private generateResultObject(result: any): IUser[] | null {
//         if (!result.rows || result.rows.length === 0) return null;
//         else {
//             return result.rows.map((row: any) => this.userFromRow(row)) as IUser[];
//         }
//     }
//
//     private userFromRow(row: any): IUser {
//         return {
//             id: row[0],
//             roleId: row[1],
//             username: row[2],
//             firstName: row[3],
//             lastName: row[4],
//             phoneNumber: row[5],
//             email: row[6],
//             telegram: row[7],
//         };
//     }
// }
//
