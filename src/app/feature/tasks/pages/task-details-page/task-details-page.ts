import {Component, Inject} from '@angular/core';
import {TASK_SERVICE} from '../../../../../core/services/services.injections-tokens';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {ITaskService} from '../../../../../core/services/task-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../../../../../core/entities/task';
import {AddOrEditTaskDialogService} from '../../widgets/add-or-edit-task-dialog-service';
import {getOptionsName} from '../../../../../core/contracts/status';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-task-details-page',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatButton,
    MatIcon
  ],
  templateUrl: './task-details-page.html',
  styleUrl: './task-details-page.css'
})
export class TaskDetailsPage {
  constructor(
    @Inject(TASK_SERVICE) private readonly taskService: ITaskService,
    private readonly route: ActivatedRoute,
    private readonly addOrEditTaskDialogService: AddOrEditTaskDialogService,
    private router: Router
  ) {
  }

  task: Task | null = null;
  isLoading = true;

  async ngOnInit() {
    await this.loadInfo();
  }

  async onEdit(task: Task) {
    const result = await this.addOrEditTaskDialogService.open(task);

    if (result) {
      await this.taskService.update(result);
      await this.loadInfo();
    }
  }

  async onDelete(task: Task) {
    if (task.id) {
      await this.taskService.delete(task.id)
      await this.router.navigate(['/tasks/']);
      location.reload();
    }
  }

  async loadInfo(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.isLoading = false;
      return;
    }

    this.task = await this.taskService.getById(id);
    this.isLoading = false;
  }

  protected readonly getOptionsName = getOptionsName;
}
