import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    /*const isApiUrl = request.url.startsWith(environment.apiUrl);*/
    const maxRetries = 2;
    const delayMs = 2000;
    var headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    if (token) {
      request = request.clone({
        headers
      });
    }
    return next.handle(request).pipe(
      retryWhen((error) => {
        return error.pipe(
          mergeMap((error, index) => {
            if (index < maxRetries && error.status == 500) {
              return of(error).pipe(delay(delayMs));
            }

            throw error;
          })
        )
      }
      ))
  }
}    
