//should generate user data for the tests using IUser interface without id

import { IUserRequest, RoleEnum} from "../types.ts";

export function generateUserData(data?: object): IUserRequest {
    return {
        username: `testUser-${Math.random()}`,
        roleId: RoleEnum.Student,
        firstName: 'testFirstName',
        lastName: 'testLastName',
        phoneNumber: 'testPhoneNumber',
        email: 'testEmail@test.qa',
        telegram: 'testTelegram',
        ...data
    };
}


// export interface IUser {
//     id: string;
//     username: string;
//     roleId: string;
//     firstName?: string;
//     lastName?: string;
//     phoneNumber?: string;
//     email?: string;
//     telegram?: string;
// }