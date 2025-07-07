import {Component, OnInit} from '@angular/core';
import {TasksStore} from '../../../tasks-store';
import {TasksList} from '../../components/tasks-list/tasks-list';

@Component({
  selector: 'app-manage-tasks-widget',
  imports: [
    TasksList
  ],
  templateUrl: './manage-tasks-widget.html',
  styleUrl: './manage-tasks-widget.scss'
})
export class ManageTasksWidget implements OnInit {
  constructor(public readonly tasksStore: TasksStore) {
  }

  ngOnInit(): void {
    this.tasksStore.loadTasks();
  }
}
