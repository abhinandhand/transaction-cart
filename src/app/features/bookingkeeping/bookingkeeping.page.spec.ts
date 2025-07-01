import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingkeepingComponent } from './bookingkeeping.page';

describe('BookingkeepingComponent', () => {
  let component: BookingkeepingComponent;
  let fixture: ComponentFixture<BookingkeepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingkeepingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingkeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
