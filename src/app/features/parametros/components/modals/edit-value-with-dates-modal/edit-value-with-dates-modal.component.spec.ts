import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValueWithDatesModalComponent } from './edit-value-with-dates-modal.component';

describe('EditValueWithDatesModalComponent', () => {
  let component: EditValueWithDatesModalComponent;
  let fixture: ComponentFixture<EditValueWithDatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditValueWithDatesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditValueWithDatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
