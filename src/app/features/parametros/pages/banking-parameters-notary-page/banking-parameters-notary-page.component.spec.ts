import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingParametersNotaryPageComponent } from './banking-parameters-notary-page.component';

describe('BankingParametersNotaryPageComponent', () => {
  let component: BankingParametersNotaryPageComponent;
  let fixture: ComponentFixture<BankingParametersNotaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingParametersNotaryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingParametersNotaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
