import { deleteUser, getUsersRoleIdById, insertUser, selectAllUsers, selectUserById } from './queries/users.ts';
import { selectAllRoles } from './queries/roles.ts';
import { deleteHWStatusByUserId, insertHWStatus, selectHomeworksStatusByUserId } from './queries/homeworkStatus.ts';
import { deleteThread, insertThread, selectAllThreads, updateThreadId } from './queries/threads.ts';

export const db = {
  users: {
    selectAll: selectAllUsers,
    selectOne: selectUserById,
    insert: insertUser,
    deleteOne: deleteUser,
    getRole: getUsersRoleIdById,
  },
  roles: {
    selectAll: selectAllRoles,
  },
  homeworkStatus: {
    insert: insertHWStatus,
    selectOne: selectHomeworksStatusByUserId,
    deleteByUserId: deleteHWStatusByUserId,
    setThreadId: updateThreadId,
  },
  threads: {
    selectAll: selectAllThreads,
    insertOne: insertThread,
    deleteOne: deleteThread,
  },
};
