import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingParametersNotaryPageComponent } from './billing-parameters-notary-page.component';

describe('BillingParametersNotaryPageComponent', () => {
  let component: BillingParametersNotaryPageComponent;
  let fixture: ComponentFixture<BillingParametersNotaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingParametersNotaryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillingParametersNotaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
