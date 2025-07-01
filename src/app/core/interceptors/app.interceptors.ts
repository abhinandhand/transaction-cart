import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export function appInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', 'testToken'),
  });

  return next(newReq).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.info(req.url, 'returned a response with status', event.status);
      }
    })
  );
}
