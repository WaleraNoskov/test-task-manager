import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../../../../core/entities/task';
import {MatList, MatListItem, MatListItemTitle} from '@angular/material/list';

@Component({
  selector: 'app-tasks-list',
  imports: [
    MatList,
    MatListItem,
    MatListItemTitle
  ],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss'
})
export class TasksList {
  @Input() tasks: Task[] = []

  @Output() viewDetails: EventEmitter<Task> = new EventEmitter();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
}
