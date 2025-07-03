import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accomodation } from './accomodation';

describe('AccomodationDetails', () => {
  let component: Accomodation;
  let fixture: ComponentFixture<Accomodation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accomodation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accomodation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
