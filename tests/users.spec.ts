import {
    describe, test, expect
} from '@jest/globals';
import {UsersService} from "./services/userService.ts";
import {generateUserData} from "./helpers/user-data-generator.ts";
import {IUser} from "./types.ts";
import {UserRepository} from "./repositories/userRepository.ts";
import {DBClient} from "./db-client/DBClient.ts";
import {uuid} from "../src/utils.ts";

const usersService = new UsersService();
let userRepository: UserRepository;
let user: IUser;

beforeAll(async () => {
    userRepository = new UserRepository();
});

afterAll(async () => {
    await DBClient.shutdown();
});


describe('Users endpoints', () => {
    test('/users POST Should create a new user', async () => {
        const userData = generateUserData();
        const newUserResponse = await usersService.createUser(userData);
        const createdUserData = newUserResponse.data.data;
        user = createdUserData;

        expect(newUserResponse.status).toBe(200);
        expect(createdUserData.id).toBeDefined();
        expect(createdUserData.username).toEqual(userData.username);

        const createdUserFromDB = await userRepository.selectOne(createdUserData.id);

        expect(createdUserFromDB).not.toBeNull();

        if (createdUserFromDB !== null) {
            //database types dictate this decision
            expect(createdUserData.id).toEqual(createdUserFromDB.id);
            expect(userData.username).toEqual(createdUserFromDB.username);
            expect(userData.roleId).toEqual(createdUserFromDB.roleId);
            expect(userData.firstName).toEqual(createdUserFromDB.firstName);
            expect(userData.lastName).toEqual(createdUserFromDB.lastName);
            expect(userData.phoneNumber).toEqual(createdUserFromDB.phoneNumber);
            expect(userData.email).toEqual(createdUserFromDB.email);
            expect(userData.telegram).toEqual(createdUserFromDB.telegram);
        }
    });

    test('/users POST Should not create a new user with username.length < 6 characters', async () => {
        const userData = generateUserData({username: 'test'});
        const newInvalidUserResponse = await usersService.createUser(userData);

        expect(newInvalidUserResponse.status).toBe(400);
        expect(newInvalidUserResponse.data).toEqual(
            {message: "Invalid user body: Error: username must be valid string with length of 6 or more"}
        );
    });

    test('/users POST Should not create a new user with invalid roleId', async () => {
        const userData = generateUserData({roleId: 'invalidRoleId'});
        const newInvalidUserResponse = await usersService.createUser(userData);

        expect(newInvalidUserResponse.status).toBe(400);
        expect(newInvalidUserResponse.data).toEqual(
            {message: "Invalid user body: Error: roleId must be a valid uuid",}
        );
    });

    test('/users/list GET should get all users', async () => {
        const usersFromDB = await userRepository.selectAll();
        const response = await usersService.getUsers();
        const users = response.data.data;

        expect(response.status).toBe(200);
        expect(users.length).toBe(usersFromDB.length);
    });

    test('/users/:id GET should get user by id', async () => {
        const response = await usersService.getUsers();
        const selectedUser = response.data.data[0];
        const userFromDB = await userRepository.selectOne(selectedUser.id);

        expect(userFromDB).toBeDefined();

        const selectOneUserResponse = (await usersService.getUserById(selectedUser.id));
        const user: IUser = selectOneUserResponse.data.data;

        expect(selectOneUserResponse.status).toBe(200);
        if (userFromDB !== null) {
            //database types dictate this decision
            expect(user.id).toEqual(userFromDB.id);
            expect(user.username).toEqual(userFromDB.username);
            expect(user.roleId).toEqual(userFromDB.roleId);
            expect(user.firstName).toEqual(userFromDB.firstName);
            expect(user.lastName).toEqual(userFromDB.lastName);
            expect(user.phoneNumber).toEqual(userFromDB.phoneNumber);
            expect(user.email).toEqual(userFromDB.email);
            expect(user.telegram).toEqual(userFromDB.telegram);
        }
    });

    test('/users/:id GET should return 404 if user not found', async () => {
        const randomUUID = uuid();
        const response = await usersService.getUserById(randomUUID);

        expect(response.status).toBe(404);
        expect(response.data).toEqual({message: `User by id=${randomUUID} not found.`});
    });

    test('/users/:id GET should return 400 if id is invalid', async () => {
        const response = await usersService.getUserById('invalidId');

        expect(response.status).toBe(400);
        expect(response.data).toEqual({message: "Invalid id: Error: id must be a valid uuid"});
    });

    test('/users/:id DELETE should delete user by id', async () => {
        const usersCountBeforeDelete = (await userRepository.selectAll()).length;
        const response = await usersService.deleteUser(user.id);
        const usersCountAfterDelete = (await userRepository.selectAll()).length;
        const userFromDB = await userRepository.selectOne(user.id);

        expect(response.status).toBe(200);
        expect(userFromDB).toBeNull();
        expect(usersCountAfterDelete).toBe(usersCountBeforeDelete - 1);
    });

    test('/users/:id DELETE should return 404 if user not found', async () => {
        const randomUUID = uuid();
        const response = await usersService.deleteUser(randomUUID);
        console.log(response.data);

        expect(response.status).toBe(404);
        expect(response.data).toEqual({message: `User by id=${randomUUID} not found.`});
    });

    test('/users/:id DELETE should return 400 if id is invalid', async () => {
        const response = await usersService.deleteUser('invalidId');

        expect(response.status).toBe(400);
        expect(response.data).toEqual({message: "Invalid id: Error: id must be a valid uuid"});
    });
});