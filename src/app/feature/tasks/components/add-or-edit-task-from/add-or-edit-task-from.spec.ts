import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTaskFrom } from './add-or-edit-task-from';

describe('AddOrEditTaskFrom', () => {
  let component: AddOrEditTaskFrom;
  let fixture: ComponentFixture<AddOrEditTaskFrom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditTaskFrom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditTaskFrom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
