import { Component } from '@angular/core';
import {ManageTasksWidget} from '../../widgets/manage-tasks-widget/manage-tasks-widget';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';

@Component({
  selector: 'app-tasks-page',
  imports: [
    ManageTasksWidget,
    MatToolbar,
    MatToolbarRow
  ],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss'
})
export class TasksPage {

}
