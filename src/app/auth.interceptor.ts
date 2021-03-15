import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { catchError } from "rxjs/operators";
import { _throw } from 'rxjs/observable/throw'; 

import { AppService } from "./app.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: AppService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/signin') || request.url.endsWith('/signup') || request.url.endsWith('/logout')) {
      return next.handle(request);
    }

    if (this.service.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          'x-access-token': this.service.getToken()
        }
      });
    }

    return next.handle(request).pipe(catchError( (error) => this.handleError(error) ))
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 || error.status === 403) {
      this.service.logout(true);
      return of(error.message);
    }

    return _throw(error);
  }

}