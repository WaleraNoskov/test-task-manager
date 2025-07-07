import {InjectionToken} from '@angular/core';
import {ITaskService} from './task-service';

export const TASK_SERVICE = new InjectionToken<ITaskService>('TASK_SERVICE');
