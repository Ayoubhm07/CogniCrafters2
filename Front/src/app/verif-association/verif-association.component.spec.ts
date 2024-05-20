import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifAssociationComponent } from './verif-association.component';

describe('VerifAssociationComponent', () => {
  let component: VerifAssociationComponent;
  let fixture: ComponentFixture<VerifAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifAssociationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
