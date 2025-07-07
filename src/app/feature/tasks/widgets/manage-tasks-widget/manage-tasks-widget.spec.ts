import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTasksWidget } from './manage-tasks-widget';

describe('ManageTasksWidget', () => {
  let component: ManageTasksWidget;
  let fixture: ComponentFixture<ManageTasksWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTasksWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTasksWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
