import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetals } from './view.detals';

describe('ViewDetals', () => {
  let component: ViewDetals;
  let fixture: ComponentFixture<ViewDetals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
