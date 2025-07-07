import {DBSchema, IDBPDatabase, openDB} from 'idb';
import {Task} from '../core/entities/task';
import {Injectable} from '@angular/core';

export interface TasksDb extends DBSchema {
  tasks: {
    key: number;
    value: Task;
  };
}

@Injectable({providedIn: 'root'})
export class IndexedDbService {
  private readonly dbPromise: Promise<IDBPDatabase<TasksDb>>;

  constructor() {
    this.dbPromise = openDB<TasksDb>('tasks-db', 1, {
      upgrade(database: IDBPDatabase<TasksDb>,) {
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
