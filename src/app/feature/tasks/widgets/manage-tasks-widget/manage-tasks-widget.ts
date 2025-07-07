import {Component, OnInit} from '@angular/core';
import {TasksStore} from '../../../tasks-store';
import {TasksList} from '../../components/tasks-list/tasks-list';
import {MatButton} from '@angular/material/button';
import {AddOrEditTaskDialogService} from '../add-or-edit-task-dialog-service';
import {Task} from '../../../../../core/entities/task';
import {NavigationEnd, Router} from '@angular/router';

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
    private readonly addOrEditTaskDialogService: AddOrEditTaskDialogService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url === '/tasks') {
        this.tasksStore.loadTasks();
      }
    });

    this.tasksStore.loadTasks();
  }

  public async openCreateDialog(): Promise<void> {
    const result = await this.addOrEditTaskDialogService.open(null);

    if (result)
      await this.tasksStore.create(result)
  }

  public async openUpdateDialog(task: Task): Promise<void> {
    const result = await this.addOrEditTaskDialogService.open(task);

    if (result)
      await this.tasksStore.update(result);
  }

  public async deleteTask(task: Task): Promise<void> {
    if (task.id)
      await this.tasksStore.delete(task.id);
  }
}
