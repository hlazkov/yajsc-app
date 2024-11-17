import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';
import 'dotenv/config';

// export type Response<T> = Promise<AxiosResponse<T>>;

export class ApiClient {
    private instance: AxiosInstance;
    private token = '';

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.BASE_URL,
            validateStatus: () => true,
        });
    }

    private async request(config: AxiosRequestConfig): AxiosPromise {
        const requestConfig = this.getRequestConfig(config);
        return this.instance.request(requestConfig);
    }

    private getRequestConfig(config: AxiosRequestConfig): AxiosRequestConfig {
        const requestConfig = { ...config };
        if (this.token) {
            requestConfig.headers = {
                Authorization: `Bearer ${this.token}`,
            };
        }
        return requestConfig;
    }
    //
    // constructor(baseURL: string, headers?: object) {
    //     this.instance = axios.create({
    //         baseURL,
    //         validateStatus: () => true,
    //         headers: {
    //             ...headers,
    //         },
    //     });
    // }

    // protected get<T>(path: string, params?: object | string, headers?: object): Response<T> {
    //     return this.instance.get(path, { params, headers });
    // }
     async get(path: string): AxiosPromise {
        return this.request({ url: path, method: 'GET'});
      }

    // protected post<T>(path: string, body?: string | object, headers?: object): Response<T> {
    //     return this.instance.post(path, body, { headers });
    // }

     async post(path: string, data: unknown): AxiosPromise {
        return this.request({ url: path, method: 'POST', data });
      }

    // protected put<T>(path: string, body?: string | object, headers?: object): Response<T> {
    //     return this.instance.put(path, { body, headers });
    // }

    //  async patch(path: string, data: ICreateNoteRequest): AxiosPromise {
    //     return this.request({ url: path, method: 'PATCH', data });
    //   }

    // protected patch<T>(path: string, body?: string | object, headers?: object): Response<T> {
    //     return this.instance.patch(path, body, { headers });
    // }


    // protected delete<T>(path: string, body?: string | object, headers?: object): Response<T> {
    //     return this.instance.delete(path, { headers, data: body });
    // }
    //
    //  async delete(path: string): AxiosPromise {
    //     return this.request({ url: path, method: 'DELETE' });
    //   }
}