import {PaginationResult} from '../contracts/pagination-result';
import {Task} from '../entities/task';
import {GetAllTaskPaginatedRequest} from '../dtos/get-all-task-paginated-request';

export interface ITaskService {
  getAllTasksPaginated(dto: GetAllTaskPaginatedRequest): Promise<PaginationResult<Task>>;

  getById(id: number): Promise<Task | null>;

  create(task: Task): Promise<number>;

  update(task: Task): Promise<void>;

  delete(id: number): Promise<void>;
}
