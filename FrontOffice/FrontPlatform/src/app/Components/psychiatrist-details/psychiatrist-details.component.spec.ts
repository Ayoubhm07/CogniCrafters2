import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychiatristDetailsComponent } from './psychiatrist-details.component';

describe('PsychiatristDetailsComponent', () => {
  let component: PsychiatristDetailsComponent;
  let fixture: ComponentFixture<PsychiatristDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsychiatristDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PsychiatristDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
