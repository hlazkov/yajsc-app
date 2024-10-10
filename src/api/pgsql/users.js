import { executeQuery } from './dbInit.js';

const defaultAdminRoleId = "a9177d9f-31ad-4686-a44e-b784f5791a4f";

export const selectAllUsers = async () => {
    return await executeQuery(`SELECT id, username, role_id, firstname, lastname, phone, email, telegram, curator_id FROM public.users;`.split());
}

export const selectUserById = async (id) => {
    return await executeQuery(`SELECT id, username, role_id, firstname, lastname, phone, email, telegram, curator_id FROM public.users WHERE id='${id}'::uuid;`);
}

export const insertUser = async (user) => {
    const normalizedUser = {
        id: uuid(),
        username: uuid().split('-').join('').slice(0, 12),
        roleId: defaultAdminRoleId,
        firstname: 'anon',
        lastname: 'anononovich',
        ...user,
    };
    return await executeQuery(`INSERT INTO public.users
        (id, username, role_id, firstname, lastname, phone, email, telegram, curator_id)
        VALUES('${normalizedUser.id}'::uuid, '${normalizedUser.username}', '${normalizedUser.roleId}'::uuid, '${normalizedUser.firstname}', ${normalizedUser.lastname || 'NULL'}, ${normalizedUser.phone || 'NULL'}, ${normalizedUser.email || 'NULL'}, ${normalizedUser.telegram || 'NULL'}, ${normalizedUser.curatorId || 'NULL'});`);
}

export const deleteUser = async (id) => {
    return await executeQuery(`DELETE FROM public.users WHERE id='${id}'::uuid;`);
}
