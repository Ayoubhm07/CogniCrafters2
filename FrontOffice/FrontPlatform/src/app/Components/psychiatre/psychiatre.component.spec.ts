import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychiatreComponent } from './psychiatre.component';

describe('PsychiatreComponent', () => {
  let component: PsychiatreComponent;
  let fixture: ComponentFixture<PsychiatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsychiatreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PsychiatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
