import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitemComponent } from './mitem.component';

describe('MitemComponent', () => {
  let component: MitemComponent;
  let fixture: ComponentFixture<MitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
