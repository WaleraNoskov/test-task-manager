import {Status} from '../../core/contracts/status';
import {TasksStore} from './tasks-store';
import {ITaskService} from '../../core/services/task-service';
import { TASK_SERVICE } from '../../core/services/services.injections-tokens';
import {TestBed} from '@angular/core/testing';

describe('TasksStore', () => {
  let store: TasksStore;
  let taskServiceSpy: jasmine.SpyObj<ITaskService>;

  const mockTasks = [
    { id: 1, title: 'Test 1', description: '', status: Status.notStarted },
    { id: 2, title: 'Test 2', description: '', status: Status.started },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj<ITaskService>('ITaskService', [
      'getAllTasksPaginated',
      'create',
      'update',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [
        TasksStore,
        { provide: TASK_SERVICE, useValue: spy },
      ],
    });

    store = TestBed.inject(TasksStore);
    taskServiceSpy = TestBed.inject(TASK_SERVICE) as jasmine.SpyObj<ITaskService>;
  });

  it('should load tasks and update signals', async () => {
    taskServiceSpy.getAllTasksPaginated.and.resolveTo({
      items: mockTasks,
      total: 2,
    });

    expect(store.getTasks()).toEqual([]);
    expect(store.getIsLoading()).toBe(false);

    const promise = store.loadTasks();
    expect(store.getIsLoading()).toBe(true);

    await promise;

    expect(taskServiceSpy.getAllTasksPaginated).toHaveBeenCalledWith({
      pagination: { offset: 0, limit: 10 },
      titleFilter: undefined,
      statusFilter: undefined,
    });

    expect(store.getTasks()).toEqual(mockTasks);
    expect(store.getTotalTaskCount()).toBe(2);
    expect(store.getIsLoading()).toBe(false);
  });

  it('should create task and reload list', async () => {
    taskServiceSpy.create.and.resolveTo(3);
    taskServiceSpy.getAllTasksPaginated.and.resolveTo({ items: mockTasks, total: 2 });

    await store.create({ title: 'New', description: '', status: Status.started });

    expect(taskServiceSpy.create).toHaveBeenCalled();
    expect(taskServiceSpy.getAllTasksPaginated).toHaveBeenCalled();
    expect(store.getTasks()).toEqual(mockTasks);
  });

  it('should update task and reload list', async () => {
    taskServiceSpy.update.and.resolveTo();
    taskServiceSpy.getAllTasksPaginated.and.resolveTo({ items: mockTasks, total: 2 });

    await store.update(mockTasks[0]);

    expect(taskServiceSpy.update).toHaveBeenCalled();
    expect(taskServiceSpy.getAllTasksPaginated).toHaveBeenCalled();
    expect(store.getTasks()).toEqual(mockTasks);
  });

  it('should delete task and reload list with current filters', async () => {
    taskServiceSpy.delete.and.resolveTo();
    taskServiceSpy.getAllTasksPaginated.and.resolveTo({ items: mockTasks, total: 2 });

    await store.delete(1);

    expect(taskServiceSpy.delete).toHaveBeenCalledWith(1);
    expect(taskServiceSpy.getAllTasksPaginated).toHaveBeenCalled();
    expect(store.getTasks()).toEqual(mockTasks);
  });

  it('should update filters and pagination', async () => {
    taskServiceSpy.getAllTasksPaginated.and.resolveTo({ items: mockTasks, total: 2 });

    await store.loadTasks({ offset: 10, limit: 5 }, 'Test', Status.started);

    expect(store.getPaginationParams()).toEqual({ offset: 10, limit: 5 });
    expect(store.getTitleFilter()).toBe('Test');
    expect(store.getStatusFilter()).toBe(Status.started);
  });
});
