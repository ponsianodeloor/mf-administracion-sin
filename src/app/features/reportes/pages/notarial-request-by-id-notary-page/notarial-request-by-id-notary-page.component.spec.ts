import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarialRequestByIdNotaryPageComponent } from './notarial-request-by-id-notary-page.component';

describe('NotarialRequestByIdNotaryPageComponent', () => {
  let component: NotarialRequestByIdNotaryPageComponent;
  let fixture: ComponentFixture<NotarialRequestByIdNotaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotarialRequestByIdNotaryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotarialRequestByIdNotaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
