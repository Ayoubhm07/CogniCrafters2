import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherRecComponent } from './afficher-rec.component';

describe('AfficherRecComponent', () => {
  let component: AfficherRecComponent;
  let fixture: ComponentFixture<AfficherRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherRecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficherRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
