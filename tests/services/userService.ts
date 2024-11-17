import { AxiosResponse } from 'axios';
import { ApiClient } from '../api-client/ApiClient.ts';
import {IApiResponse, IUser, IUserRequest} from "../types.ts";


export class UsersService {
    private client: ApiClient;
    constructor() {
        this.client = new ApiClient();
    }

    async getUsers(): Promise<AxiosResponse<IApiResponse<IUser[]>>> {
        return this.client.get('/users/list');
    }

    async createUser(user: IUserRequest): Promise<AxiosResponse<IApiResponse<IUser>>> {
        return this.client.post('/users', user);
    }

    async getUserById(id: string): Promise<AxiosResponse<IApiResponse<IUser>>> {
        return this.client.get(`/users/${id}`);
    }

    // async deleteUser(): AxiosPromise<AxiosResponse> {
    //     return this.client.delete('/users');
    // }

}