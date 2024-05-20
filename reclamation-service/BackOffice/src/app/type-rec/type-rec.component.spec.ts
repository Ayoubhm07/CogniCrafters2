import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRecComponent } from './type-rec.component';

describe('TypeRecComponent', () => {
  let component: TypeRecComponent;
  let fixture: ComponentFixture<TypeRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeRecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
