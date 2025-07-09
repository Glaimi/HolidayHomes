import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetails } from './accommodation-details';

describe('ViewDetals', () => {
  let component: AccommodationDetails;
  let fixture: ComponentFixture<AccommodationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
