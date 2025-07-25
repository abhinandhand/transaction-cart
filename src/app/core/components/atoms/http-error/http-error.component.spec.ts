import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorComponent } from './http-error.component';
import { HttpErrorResponse } from '@angular/common/http';

describe('HttpErrorComponent', () => {
  let component: HttpErrorComponent;
  let fixture: ComponentFixture<HttpErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpErrorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('error', {message: 'Not found'} as HttpErrorResponse)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
