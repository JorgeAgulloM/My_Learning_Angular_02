import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { AppEndPoints } from '../endpoints.component';
import { FormLogin } from '../Models/FormLogin';
import { map } from 'rxjs/operators';

const LOGIN_KEY: string = 'login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  //Se genera un BehaviorSubject privado para la clase para observar y ser observado.
  private loginModelBehaviorSubject: BehaviorSubject<FormLogin | null>
  public login: Observable<FormLogin | null> //Con el login público el resto del programa podrá saber si hay o no un usuario logado

  constructor(private http: HttpClient) {
    this.loginModelBehaviorSubject = new BehaviorSubject<FormLogin | null>(JSON.parse(<string>localStorage?.getItem(LOGIN_KEY)))
    this.login = this.loginModelBehaviorSubject.asObservable()
  }


  performLogin(data: FormLogin): Observable<FormLogin>{
    return this
    .http
    .post<FormLogin>(AppEndPoints.END_POINT_API_AUTH, data)
    .pipe(map(response => {
      response.set_password('')
      //Se emite sobre el observable para quien esté suscrito
      this.loginModelBehaviorSubject.next(response)
      //Guarga el resultado en local storage
      localStorage.setItem(LOGIN_KEY, JSON.stringify(response))
      return response
    },
    //En caso de error
    map(error => {
      return JSON.stringify(error)
    })))
  }

  //Cierra la sesión y emite a los suscriptores qu ya no hay usuario logado
  prformLogout(): void{
    localStorage.removeItem(LOGIN_KEY)
    this.loginModelBehaviorSubject.next(null)
  }

}
