import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationList } from './accomodation-list';

describe('AccomodationList', () => {
  let component: AccomodationList;
  let fixture: ComponentFixture<AccomodationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomodationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccomodationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
