import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateParametrosFacturacionNotariasModalComponent } from './create-or-update-parametros-facturacion-notarias-modal.component';

describe('CreateOrUpdateParametrosFacturacionNotariasModalComponent', () => {
  let component: CreateOrUpdateParametrosFacturacionNotariasModalComponent;
  let fixture: ComponentFixture<CreateOrUpdateParametrosFacturacionNotariasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateParametrosFacturacionNotariasModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrUpdateParametrosFacturacionNotariasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
