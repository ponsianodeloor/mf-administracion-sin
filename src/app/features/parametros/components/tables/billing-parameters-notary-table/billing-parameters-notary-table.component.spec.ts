import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingParametersNotaryTableComponent } from './billing-parameters-notary-table.component';

describe('BillingParametersNotaryTableComponent', () => {
  let component: BillingParametersNotaryTableComponent;
  let fixture: ComponentFixture<BillingParametersNotaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingParametersNotaryTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillingParametersNotaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
