import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accommodation } from './accommodation';

describe('AccomodationDetails', () => {
  let component: Accommodation;
  let fixture: ComponentFixture<Accommodation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accommodation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accommodation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
