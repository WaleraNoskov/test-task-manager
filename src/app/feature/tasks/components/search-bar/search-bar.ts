import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {getOptionsName, Status} from '../../../../../core/contracts/status';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-search-bar',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  titleFilter: string = '';

  @Output() titleFilterChanged = new EventEmitter<string>();
  @Output() statusChanged = new EventEmitter<Status | undefined>();

  readonly statusOptions: Status[] = [
    Status.notStarted,
    Status.started,
    Status.completed,
  ]

  protected readonly getOptionsName = getOptionsName;
}
