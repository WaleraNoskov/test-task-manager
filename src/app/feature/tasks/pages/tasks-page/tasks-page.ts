import { Component } from '@angular/core';
import {ManageTasksWidget} from '../../widgets/manage-tasks-widget/manage-tasks-widget';

@Component({
  selector: 'app-tasks-page',
  imports: [
    ManageTasksWidget
  ],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss'
})
export class TasksPage {

}
