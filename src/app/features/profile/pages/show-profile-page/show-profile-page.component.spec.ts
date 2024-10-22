import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfilePageComponent } from './show-profile-page.component';

describe('ShowProfilePageComponent', () => {
  let component: ShowProfilePageComponent;
  let fixture: ComponentFixture<ShowProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProfilePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
