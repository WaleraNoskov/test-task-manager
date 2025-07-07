import { Task } from '../../core/entities/task';
import {TaskService} from './task-service';
import {Status} from '../../core/contracts/status';
import {TestBed} from '@angular/core/testing';
import {IndexedDbService} from '../indexed-db.service';
import {GetAllTaskPaginatedRequest} from '../../core/dtos/get-all-task-paginated-request';

describe('TaskService', () => {
  let service: TaskService;
  let mockDb: any;

  const mockTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'desc', status: Status.notStarted },
    { id: 2, title: 'Task 2', description: 'desc', status: Status.started },
    { id: 3, title: 'Another Task', description: 'desc', status: Status.completed },
  ];

  beforeEach(() => {
    const store = {
      getAll: jasmine.createSpy().and.resolveTo([...mockTasks]),
      get: jasmine.createSpy().and.callFake((id: number) =>
        Promise.resolve(mockTasks.find(t => t.id === id) ?? undefined)
      ),
      add: jasmine.createSpy().and.callFake((task: Task) => Promise.resolve(4)),
      put: jasmine.createSpy().and.resolveTo(undefined),
      delete: jasmine.createSpy().and.resolveTo(undefined),
    };

    mockDb = {
      transaction: jasmine.createSpy().and.returnValue({
        objectStore: () => store
      }),
    };

    const mockIndexedDbService = {
      db: Promise.resolve(mockDb),
    };

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: IndexedDbService, useValue: mockIndexedDbService },
      ],
    });

    service = TestBed.inject(TaskService);
  });

  it('should create a task and return id', async () => {
    const task: Task = { title: 'New Task', description: '', status: Status.notStarted };
    const id = await service.create(task);
    expect(id).toBe(4);
  });

  it('should return a task by id', async () => {
    const task = await service.getById('2');
    expect(task).toEqual(mockTasks[1]);
  });

  it('should return null if task not found', async () => {
    const task = await service.getById('999');
    expect(task).toBeNull();
  });

  it('should update a task', async () => {
    const updatedTask = { ...mockTasks[0], title: 'Updated' };
    await service.update(updatedTask);
    expect(mockDb.transaction).toHaveBeenCalled();
  });

  it('should delete a task by id', async () => {
    await service.delete(1);
    expect(mockDb.transaction).toHaveBeenCalled();
  });

  it('should return paginated tasks with filters', async () => {
    const dto: GetAllTaskPaginatedRequest = {
      pagination: { offset: 0, limit: 2 },
      titleFilter: 'task',
      statusFilter: Status.notStarted,
    };

    const result = await service.getAllTasksPaginated(dto);
    expect(result.total).toBe(1);
    expect(result.items.length).toBe(1);
    expect(result.items[0].title).toBe('Task 1');
  });
});
