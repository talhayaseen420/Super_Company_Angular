import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class errorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem('access_token')
    const modifiedReq = req.clone({
      // setHeaders: { 
      //   Authorization: `Bearer ${access_token}`,
      // },
      // setParams: {
      //   'lat' : "10"
      // }
    });
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = "";
        if (error.error instanceof ErrorEvent) {
         errorMsg = `Client Error: ${error.error.message}`;
        } else {
         errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
        }
        this.toastr.error(errorMsg);
        console.log(errorMsg);
        return throwError(() => errorMsg);
       }),
    );
  }
}
