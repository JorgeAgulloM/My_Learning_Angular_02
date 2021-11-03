import { FormLogin } from 'src/app/Models/FormLogin';
import { AppEndPoints } from './../endpoints.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { FormNewOffer } from '../Models/FormNewOffer';

@Injectable({
  providedIn: 'root'
})
export class CommAPIService {

  constructor(
    private _http: HttpClient,
    private _cookie: CookieService
  ) {
    this._cookie.set('id_token', "null")
  }

  //  HttpClient Observable. Petición Get
  getDataOffers(): Observable<any> {
    const URL = AppEndPoints.END_POINT_API_OFERTAS
    return this._http.get(URL)
  }

  //  HttpClient Observable. Petición Get/id
  getDataOfferID(id: string): Observable<any> {
    const URL = AppEndPoints.END_POINT_API_OFERTAS + `/${id}`
    return this._http.get(URL)
  }

  //  HttpClient Observable. Petición Post Auth
  postDataUserLogin(body: FormLogin): Observable<any> {
    const headers = {'Content-Type':  'application/json', 'Authorization': 'Bearer my-token'}
    return this._http.post<FormLogin>(AppEndPoints.END_POINT_API_AUTH, JSON.stringify(body), {headers})
  }

  //  Setter para guardar el token
  setToken(token: string) {
    console.log(this._cookie.getAll())
    this._cookie.set('id_token', token)
    console.log(this._cookie.getAll())
  }

  //  Getter para obtener el token
  getToken(): string {
    return this._cookie.get('id_token')
  }

  // obtener estado de usuario
  getUserState(): boolean {
    console.log(this._cookie.getAll())
    console.log(this._cookie.get('id_token'))

    return (this._cookie.get('id_token') != "null")

  }

  // HttpClien Observable. Petición Post New Offer
  insertNewOffer(body: FormNewOffer): Observable<any> {
    const headers = {Authorization: `Bearer ${this.getToken()}`, 'Content-Type': 'application/json'}
    return this._http.post(AppEndPoints.END_POINT_API_NUEVA_OFERTA, JSON.stringify(body), {headers})
  }

  // HttpClien Observable. Petición Delete
  deleteOneOffer(id: string): Observable<any> {
    const headers = {Authorization: `Bearer ${this.getToken()}`}
    return this._http.delete(AppEndPoints.END_POINT_API_OFERTAS + `/${id}`, {headers})

  }

}
