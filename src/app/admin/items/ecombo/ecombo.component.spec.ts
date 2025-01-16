import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomboComponent } from './ecombo.component';

describe('EcomboComponent', () => {
  let component: EcomboComponent;
  let fixture: ComponentFixture<EcomboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcomboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
