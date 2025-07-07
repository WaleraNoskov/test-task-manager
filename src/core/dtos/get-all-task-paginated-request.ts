import {PaginationParams} from '../contracts/pagination-params';
import {Status} from '../contracts/status';

export interface GetAllTaskPaginatedRequest {
  pagination: PaginationParams;
  titleFilter?: string;
  statusFilter?: Status
}
