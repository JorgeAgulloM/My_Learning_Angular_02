import { AppEndPoints } from './../endpoints.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { FormNewOffer } from '../Models/FormNewOffer';
import { LoginService } from './login.service';
import { AuthguardGuard } from '../guards/authguard.guard';

@Injectable({
  providedIn: 'root'
})
export class CommAPIService {

  constructor(
    private _http: HttpClient,
    private _cookie: CookieService,
    private _loginSrv: LoginService
  ) {
    //this.deleteToken()
  }


  //################### API ofertas de trabajo ############################################

  /* NOTA* Jose, se que en el taller aconsejaste usar los models en vez de objetos any
  para los observables, pero dado que ya lo tenia así y funcionando, y el tiempo escasea,
  he preferido dejarlo así. */


  //  HttpClient Observable. Petición Get
  getAllOffers(): Observable<any> {
    //Comprobaciones de caja blanca
    console.log('C.Blanca: Service - Se recibe llamada/petición Get')

    return this._http.get(AppEndPoints.END_POINT_API_OFERTAS)
  }

  //  HttpClient Observable. Petición Get/id
  getDataOfferID(id: string): Observable<any> {
    return this._http.get(AppEndPoints.END_POINT_API_OFERTAS + `/${id}`)
  }

/*   //  HttpClient Observable. Petición Post Auth
  postUserLogin(body: FormLogin): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer id_token' }
    return this._http.post<FormLogin>(AppEndPoints.END_POINT_API_AUTH, JSON.stringify(body), { headers })
  } */

  // HttpClien Observable. Petición Post New Offer
  insertNewOffer(body: FormNewOffer): Observable<any> {
    //Comprobaciones de caja blanca
    console.log('C.Blanca: service/insert - Se recibe petición y datos para insertar nueva oferta en API. Se envian.')

    const headers = { Authorization: `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' }
    return this._http.post(AppEndPoints.END_POINT_API_NUEVA_OFERTA, JSON.stringify(body), { headers })
  }

  // HttpClien Observable. Petición Put Edit Offer
  edithNewOffer(body: FormNewOffer): Observable<FormNewOffer> {
    const headers = { Authorization: `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' }
    return this._http.put<FormNewOffer>(AppEndPoints.END_POINT_API_OFERTAS, (body) , { headers })
  }

  // HttpClien Observable. Petición Delete
  deleteOneOffer(id: string): Observable<any> {
    const headers = { Authorization: `Bearer ${this.getToken().split('login')}` }
    return this._http.delete(AppEndPoints.END_POINT_API_OFERTAS + `/${id}`, { headers })
  }


  //  Getter para obtener el token
  getToken(): string {
    console.log(localStorage.getItem('login')!.split('id_token'))
    console.log(JSON.stringify(localStorage.getItem('login')!))
    return ''
  }

/*   //  Setter para guardar el token
  saveToken(token: string) {
    this._cookie.set('id_token', token)
  }



  //  Setter para eliminar el token al cerrar sesión
  deleteToken(): void {
    this._cookie.deleteAll()
  }

  //  Método para cerra la sesión de usuario
  closeSessionUser(): boolean {
    this.deleteToken()
    return this.getUserSessionStataus()
  }

  //  obtener estado de usuario según disponibilidad del token
  getUserSessionStataus(): boolean {
    return (this._cookie.get('id_token') == null ||
      !this._cookie.check('id_token') ||
      this._cookie.get('id_token').length < 4) ? false : true
  } */

}
