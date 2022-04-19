import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session = sessionStorage.getItem('session');
    const obj = session != null ? JSON.parse(session) : null;
    if(obj === null) { return next.handle(req); }
    let request = req;
    if(obj.access_token) {
      request = req.clone({
        setHeaders: {
          authorization: obj.access_token
        }
      });
    }
    return next.handle(request);
  }
}
