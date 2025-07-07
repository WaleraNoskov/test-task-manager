import {TASK_SERVICE} from '../core/services/services.injections-tokens';
import {TaskService} from './services/task-service';

export function provideInfrastructureServices(){
  return [
    {provide: TASK_SERVICE, useClass: TaskService},
  ]
}
