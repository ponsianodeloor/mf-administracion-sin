import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElectronicSignBillingByIdModalComponent } from './edit-electronic-sign-billing-by-id-modal.component';

describe('EditElectronicSignBillingByIdModalComponent', () => {
  let component: EditElectronicSignBillingByIdModalComponent;
  let fixture: ComponentFixture<EditElectronicSignBillingByIdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditElectronicSignBillingByIdModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditElectronicSignBillingByIdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
