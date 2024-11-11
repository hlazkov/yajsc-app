import { Thread } from '../api/types.ts';
import { db } from '../pgsql/db.helper.ts';

export class ThreadsCache {
  private static instance: Thread[] = [];

  static getInstance = async () => {
    if (this.instance.length === 0) {
      this.instance = await db.threads.selectAll();
    }
    return this.instance;
  };

  static defaultThreadId = async (): Promise<string | undefined> => {
    const threads = await this.getInstance();
    const defaultId = threads.find(role => role.name === 'default');
    return defaultId ? defaultId.id : undefined;
  };

  static updateCache = async (): Promise<void> => {
    this.instance = await db.threads.selectAll();
  };
}
