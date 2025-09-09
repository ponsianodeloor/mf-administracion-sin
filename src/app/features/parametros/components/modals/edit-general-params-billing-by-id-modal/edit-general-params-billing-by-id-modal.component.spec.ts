import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneralParamsBillingByIdModalComponent } from './edit-general-params-billing-by-id-modal.component';

describe('EditGeneralParamsBillingByIdModalComponent', () => {
  let component: EditGeneralParamsBillingByIdModalComponent;
  let fixture: ComponentFixture<EditGeneralParamsBillingByIdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGeneralParamsBillingByIdModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGeneralParamsBillingByIdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
