import { HttpErrorResponse } from '@angular/common/http';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-http-error',
  imports: [],
  templateUrl: './http-error.component.html',
  styleUrl: './http-error.component.scss'
})
export class HttpErrorComponent {
  error = input.required<HttpErrorResponse | null>();
}
