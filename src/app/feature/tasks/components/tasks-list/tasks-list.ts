import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../../../../core/entities/task';
import {MatList, MatListItem, MatListItemTitle} from '@angular/material/list';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {getOptionsName} from '../../../../../core/contracts/status';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  imports: [
    MatList,
    MatListItem,
    MatListItemTitle,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    MatMenu,
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss'
})
export class TasksList {
  @Input() tasks: Task[] = []

  @Output() viewDetails: EventEmitter<Task> = new EventEmitter();
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  protected readonly getOptionsName = getOptionsName;
}
