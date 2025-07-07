import {Component, computed, EventEmitter, Inject, Output} from '@angular/core';
import {Task} from '../../../../../core/entities/task';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {getOptionsName, Status} from '../../../../../core/contracts/status';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-add-or-edit-task-from',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatOption,
    MatButton,
    MatSelect,
  ],
  templateUrl: './add-or-edit-task-from.html',
  styleUrl: './add-or-edit-task-from.scss'
})
export class AddOrEditTaskFrom {
  form!: TaskFormType;
  readonly isEditMode = computed(() => this.task !== null);
  readonly statusOptions: Status[] = [
    Status.notStarted,
    Status.started,
    Status.completed,
  ]

  @Output() submitted = new EventEmitter<Task>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task | null) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl<number | null>(null),
      title: new FormControl('', {nonNullable: true}),
      description: new FormControl<string | null>(null),
      status: new FormControl<Status>(Status.notStarted, {nonNullable: true})
    });

    if (this.task)
      this.form.patchValue(this.task);
  }

  submit(): void {
    if (this.form.valid)
      this.submitted.emit(this.form.value as Task);
  }

  cancel(): void {
    this.cancelled.emit();
  }

  protected readonly getOptionsName = getOptionsName;
}

type TaskFormType = FormGroup<{
  id: FormControl<number | null>;
  title: FormControl<string>;
  description: FormControl<string | null>;
  status: FormControl<Status>;
}>;
