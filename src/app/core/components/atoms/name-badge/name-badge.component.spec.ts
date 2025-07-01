import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameBadgeComponent } from './name-badge.component';

describe('NameBadgeComponent', () => {
  let component: NameBadgeComponent;
  let fixture: ComponentFixture<NameBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
