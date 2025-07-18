import {Status} from '../contracts/status';

export interface Task {
  id?: number;
  title: string;
  description: string | null;
  status: Status;
}
