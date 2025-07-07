import {DBSchema, IDBPDatabase, openDB} from 'idb';
import {Task} from '../core/entities/task';
import {Injectable} from '@angular/core';

export interface FinanceDb extends DBSchema {
  tasks: {
    key: string;
    value: Task;
  };
}

@Injectable({providedIn: 'root'})
export class IndexedDbService {
  private readonly dbPromise: Promise<IDBPDatabase<FinanceDb>>;

  constructor() {
    this.dbPromise = openDB<FinanceDb>('tasks-db', 1, {
      upgrade(database: IDBPDatabase<FinanceDb>,) {
        const tasksStore = database.createObjectStore('tasks',
          {
            keyPath: 'id',
            autoIncrement: true,
          })
      }
    });
  }

  get db() {
    return this.dbPromise;
  }
}
