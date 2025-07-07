import {Routes} from '@angular/router';
import {TasksPage} from './feature/tasks/pages/tasks-page/tasks-page';
import {TaskDetailsPage} from './feature/tasks/pages/task-details-page/task-details-page';

export const routes: Routes = [
  {path: 'tasks', component: TasksPage, title: 'Tasks'},
  {path: 'tasks/:id', component: TaskDetailsPage, title: 'Details'},
];
