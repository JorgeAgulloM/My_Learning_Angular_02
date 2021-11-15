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
import { AuthguardGuard } from '../guards/authguard.guard';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  _user!: FormLogin | null
  _token!: string | null

  constructor(
    private _loginSrv: LoginService,
    private _authGuard: AuthguardGuard
  ) {
    this._loginSrv.login.subscribe(user => {
      this._user = user
      this._token = this._authGuard.canActivate.toString()
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
