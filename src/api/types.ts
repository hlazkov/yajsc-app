export interface User {
  id: string;
  username: string;
  roleId: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  telegram?: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface Thread {
  id: string;
  name: string;
}
