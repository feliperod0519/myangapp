import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(e=>{
                      if (e){
                        switch(e.status){
                          case 400:
                            if (e.error.errors)
                            {
                              const errors=[];
                              for(const k in e.error.errors){
                                errors.push(e.error.errors[k]);
                              }
                              throw errors.flat();
                            }
                            else{
                              this.toastr.error(e.statusText,e.status);
                            }
                            break;
                          case 401:
                            this.toastr.error(e.statusText,e.status);
                            break;
                          case 404:
                            this.router.navigateByUrl('/not-found');
                            break;
                          case 500:
                            const navExtras: NavigationExtras = {state: {error: e.error}};
                            this.router.navigateByUrl('/server-error',navExtras);
                            break;
                          default:
                            this.toastr.error("Something unexpected went wrong!")
                            break;
                        }
                      }  
                      return throwError(()=>{new Error(e)});
                    })
      );
  }
}
