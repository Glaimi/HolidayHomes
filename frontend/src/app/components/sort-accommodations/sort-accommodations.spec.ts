import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAccommodations } from './sort-accommodations';

describe('SortAccommodations', () => {
  let component: SortAccommodations;
  let fixture: ComponentFixture<SortAccommodations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAccommodations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortAccommodations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
