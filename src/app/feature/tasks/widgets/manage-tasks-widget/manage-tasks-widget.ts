import {Component, OnInit} from '@angular/core';
import {TasksStore} from '../../../tasks-store';
import {TasksList} from '../../components/tasks-list/tasks-list';
import {MatButton} from '@angular/material/button';
import {AddOrEditTaskDialogService} from '../add-or-edit-task-dialog-service';

@Component({
  selector: 'app-manage-tasks-widget',
  imports: [
    TasksList,
    MatButton
  ],
  templateUrl: './manage-tasks-widget.html',
  styleUrl: './manage-tasks-widget.scss'
})
export class ManageTasksWidget implements OnInit {
  constructor(
    public readonly tasksStore: TasksStore,
    private readonly addOrEditTaskDialogService: AddOrEditTaskDialogService
  ) {
  }

  ngOnInit(): void {
    this.tasksStore.loadTasks();
  }

  public async openCreateDialog(): Promise<void> {
    const result = await this.addOrEditTaskDialogService.open(null);

    if (result)
      await this.tasksStore.create(result)
  }
}
