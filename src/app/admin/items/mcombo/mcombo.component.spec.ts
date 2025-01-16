import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McomboComponent } from './mcombo.component';

describe('McomboComponent', () => {
  let component: McomboComponent;
  let fixture: ComponentFixture<McomboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McomboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
