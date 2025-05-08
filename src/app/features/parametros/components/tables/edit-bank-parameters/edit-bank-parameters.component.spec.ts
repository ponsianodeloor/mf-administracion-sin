import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBankParametersComponent } from './edit-bank-parameters.component';

describe('EditBankParametersComponent', () => {
  let component: EditBankParametersComponent;
  let fixture: ComponentFixture<EditBankParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBankParametersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBankParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
