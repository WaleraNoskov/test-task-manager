import {Routes} from '@angular/router';
import {TasksPage} from './feature/tasks/pages/tasks-page/tasks-page';

export const routes: Routes = [
  {path: 'tasks', component: TasksPage, title: 'Tasks'},
];
