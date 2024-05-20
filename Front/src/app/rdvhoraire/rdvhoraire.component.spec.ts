import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvhoraireComponent } from './rdvhoraire.component';

describe('RdvhoraireComponent', () => {
  let component: RdvhoraireComponent;
  let fixture: ComponentFixture<RdvhoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RdvhoraireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdvhoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
