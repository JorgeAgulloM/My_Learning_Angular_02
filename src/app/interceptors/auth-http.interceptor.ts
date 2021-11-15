import { FormLogin } from 'src/app/Models/FormLogin';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  _user!: FormLogin | null
  _token!: String | null

  constructor(
    private _loginSrv: LoginService
  ) {
    this._loginSrv.login.subscribe(user => {
      this._user = user
      this._loginSrv.login.subscribe(token => {
        //TODO
      })
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
