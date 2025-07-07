import {MatDialog} from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import { Task } from '../../../../core/entities/task';
import {AddOrEditTaskFrom} from '../components/add-or-edit-task-from/add-or-edit-task-from';

@Injectable({ providedIn: 'root' })
export class AddOrEditTaskDialogService {
  constructor(private dialog: MatDialog) {}

  open(task: Task | null): Promise<Task | undefined> {
    const ref = this.dialog.open(AddOrEditTaskFrom, {
      data: task,
      disableClose: true,
    });

    return new Promise(resolve => {
      const sub = ref.componentInstance.submitted.subscribe(result => {
        sub.unsubscribe();
        ref.close();
        resolve(result);
      });

      const cancelSub = ref.componentInstance.cancelled.subscribe(() => {
        cancelSub.unsubscribe();
        sub.unsubscribe();
        ref.close();
        resolve(undefined);
      });
    });
  }
}
