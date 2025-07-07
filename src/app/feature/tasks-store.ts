import {computed, Inject, Injectable, signal} from '@angular/core';
import {Task} from '../../core/entities/task';
import {PaginationParams} from '../../core/contracts/pagination-params';
import {Status} from '../../core/contracts/status';
import {TASK_SERVICE} from '../../core/services/services.injections-tokens';
import {ITaskService} from '../../core/services/task-service';

@Injectable({providedIn: 'root'})
export class TasksStore {
  private isLoading = signal<boolean>(false);
  getIsLoading = computed(() => this.isLoading());

  private tasks = signal<Task[]>([]);
  public readonly getTasks = computed(() => this.tasks());

  private totalTaskCount = signal<number>(0);
  public readonly getTotalTaskCount = computed(() => this.totalTaskCount());

  private pagination = signal<PaginationParams>({offset: 0, limit: 10});
  public readonly getPaginationParams = computed(() => this.pagination());

  private titleFilter = signal<string | undefined>(undefined);
  public readonly getTitleFilter = computed(() => this.titleFilter());

  private statusFilter = signal<Status | undefined>(undefined);
  public readonly getStatusFilter = computed(() => this.statusFilter());

  constructor(@Inject(TASK_SERVICE) private readonly taskService: ITaskService) {
  }

  async loadTasks(pagination: PaginationParams = {offset: 0, limit: 10},
                  titleFilter: string | undefined = undefined,
                  statusFilter: Status | undefined = undefined): Promise<void> {
    this.isLoading.set(true);

    this.pagination.set(pagination);
    this.titleFilter.set(titleFilter);
    this.statusFilter.set(statusFilter);

    const tasks = await this.taskService.getAllTasksPaginated({
      pagination: pagination,
      titleFilter: titleFilter,
      statusFilter: statusFilter
    });
    this.tasks.set(tasks.items);
    this.totalTaskCount.set(tasks.total);

    this.isLoading.set(false);
  }

  async create(task: Task): Promise<void> {
    this.isLoading.set(true);

    await this.taskService.create(task);
    await this.loadTasks();

    this.isLoading.set(false);
  }

  async update(task: Task): Promise<void> {
    this.isLoading.set(true);

    await this.taskService.update(task);
    await this.loadTasks();

    this.isLoading.set(false);
  }

  async delete(taskId: number): Promise<void> {
    this.isLoading.set(true);

    await this.taskService.delete(taskId);
    await this.loadTasks(this.pagination(), this.titleFilter(), this.statusFilter());

    this.isLoading.set(false);
  }
}
