import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvdetailComponent } from './rdvdetail.component';

describe('RdvdetailComponent', () => {
  let component: RdvdetailComponent;
  let fixture: ComponentFixture<RdvdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RdvdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdvdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
