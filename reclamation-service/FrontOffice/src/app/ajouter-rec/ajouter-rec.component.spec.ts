import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRecComponent } from './ajouter-rec.component';

describe('AjouterRecComponent', () => {
  let component: AjouterRecComponent;
  let fixture: ComponentFixture<AjouterRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterRecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
