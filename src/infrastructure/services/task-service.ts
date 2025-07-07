import {GetAllTaskPaginatedRequest} from '../../core/dtos/get-all-task-paginated-request';
import {ITaskService} from '../../core/services/task-service';
import {IndexedDbService} from '../indexed-db.service';
import {PaginationResult} from '../../core/contracts/pagination-result';
import {Injectable} from '@angular/core';
import {Task} from '../../core/entities/task';
import {Status} from '../../core/contracts/status';

@Injectable({ providedIn: 'root' })
export class TaskService implements ITaskService {
  constructor(private readonly idbService: IndexedDbService) {}

  async getAllTasksPaginated(dto: GetAllTaskPaginatedRequest): Promise<PaginationResult<Task>> {
    const db = await this.idbService.db;
    const tx = db.transaction('tasks', 'readonly');
    const store = tx.objectStore('tasks');

    let allTasks = await store.getAll();

    if (dto.titleFilter) {
      const filter = dto.titleFilter.toLowerCase();
      allTasks = allTasks.filter(task => task.title.toLowerCase().includes(filter));
    }

    if (dto.statusFilter !== undefined) {
      allTasks = allTasks.filter(task => task.status === dto.statusFilter);
    }

    const total = allTasks.length;

    const { offset, limit } = dto.pagination;
    const paginatedItems = allTasks.slice(offset, offset + limit);

    return {
      items: paginatedItems,
      total,
    };
  }

  async getById(id: number): Promise<Task | null> {
    const db = await this.idbService.db;
    const tx = db.transaction('tasks', 'readonly');
    const store = tx.objectStore('tasks');

    return await store.get(id) ?? null;
  }

  async create(task: Task): Promise<number> {
    const db = await this.idbService.db;

    const { id, status, ...rest } = task;

    const taskToInsert: Task = {
      ...rest,
      status: Status.notStarted,
    };

    const insertedId = await db.add('tasks', taskToInsert);
    return insertedId;
  }

  async update(task: Task): Promise<void> {
    if (task.id === undefined) {
      throw new Error('Cannot update a task without an id');
    }

    const db = await this.idbService.db;
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');

    await store.put(task);
  }

  async delete(id: number): Promise<void> {
    const db = await this.idbService.db;
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');

    const numericId = id;
    await store.delete(numericId);
  }
}
