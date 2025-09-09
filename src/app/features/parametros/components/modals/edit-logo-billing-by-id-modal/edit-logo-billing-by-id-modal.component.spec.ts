import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogoBillingByIdModalComponent } from './edit-logo-billing-by-id-modal.component';

describe('EditLogoBillingByIdModalComponent', () => {
  let component: EditLogoBillingByIdModalComponent;
  let fixture: ComponentFixture<EditLogoBillingByIdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLogoBillingByIdModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLogoBillingByIdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
