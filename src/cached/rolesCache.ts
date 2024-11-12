import { Role } from '../api/types.ts';
import { db } from '../pgsql/db.helper.ts';

export class RolesCache {
  private static instance: Role[] = [];

  static getInstance = async () => {
    if (this.instance.length === 0) {
      this.instance = await db.roles.selectAll();
    }
    return this.instance;
  };

  static studentRoleId = async (): Promise<string | undefined> => {
    const roles = await this.getInstance();
    const student = roles.find(role => role.name === 'student');
    return student ? student.id : undefined;
  };
}

export const isStudent = async (roleId: string): Promise<boolean> => {
  const studentRoleId = await RolesCache.studentRoleId();
  return !!studentRoleId && roleId === studentRoleId;
};
