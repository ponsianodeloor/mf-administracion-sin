import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomParametersPageComponent } from './zoom-parameters-page.component';

describe('ZoomParametersPageComponent', () => {
  let component: ZoomParametersPageComponent;
  let fixture: ComponentFixture<ZoomParametersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomParametersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoomParametersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
