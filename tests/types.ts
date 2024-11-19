export interface IApiResponse<T> {
    data: T;
}

export interface IUser {
    id: string;
    username: string;
    roleId: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    telegram?: string;
}

export type IUserRequest = Omit<IUser, "id">

export interface IHomeworkStatus {
    id: string;
    userId: string;
    threadId: string;
    unitStatus: number[];
}

export interface IRole {
    id: string;
    name: string;
}

export interface IThread {
    id: string;
    name: string;
}

//TODO: move to the roleRepository
export enum RoleEnum {
    Student = '946a3850-0dfb-4fe8-8660-cb1eceaeb41c',
    Mentor = 'f099b2bb-f17a-4266-9f0a-57b279e720db',
    Admin = 'a9177d9f-31ad-4686-a44e-b784f5791a4f'
}
