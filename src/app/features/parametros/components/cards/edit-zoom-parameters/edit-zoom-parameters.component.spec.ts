import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZoomParametersComponent } from './edit-zoom-parameters.component';

describe('EditZoomParametersComponent', () => {
  let component: EditZoomParametersComponent;
  let fixture: ComponentFixture<EditZoomParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditZoomParametersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditZoomParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
