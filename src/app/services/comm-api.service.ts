import { AppEndPoints } from './../endpoints.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { FormNewOffer } from '../Models/FormNewOffer';

@Injectable({
  providedIn: 'root'
})
export class CommAPIService {

  constructor(
    private _http: HttpClient
  ) {
    //this.deleteToken()
  }

  //################### API ofertas de trabajo ############################################

  //  HttpClient Observable. Petición Get
  getAllOffers(): Observable<FormNewOffer> {
    //Comprobaciones de caja blanca
    console.log('C.Blanca: Service - Se recibe llamada/petición Get')

    return this._http.get<FormNewOffer>(AppEndPoints.END_POINT_API_OFERTAS)
  }

  //  HttpClient Observable. Petición Get/id
  getDataOfferID(id: string): Observable<FormNewOffer> {
    return this._http.get<FormNewOffer>(AppEndPoints.END_POINT_API_OFERTAS + `/${id}`)
  }

  // HttpClien Observable. Petición Post New Offer
  insertNewOffer(body: FormNewOffer): Observable<FormNewOffer> {
    //Comprobaciones de caja blanca
    console.log('C.Blanca: service/insert - Se recibe petición y datos para insertar nueva oferta en API. Se envian.')

    const headers = { Authorization: `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' }
    return this._http.post<FormNewOffer>(AppEndPoints.END_POINT_API_NUEVA_OFERTA, JSON.stringify(body), { headers })
  }

  // HttpClien Observable. Petición Put Edit Offer
  edithNewOffer(body: FormNewOffer): Observable<FormNewOffer> {
    const headers = { Authorization: `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' }
    return this._http.put<FormNewOffer>(AppEndPoints.END_POINT_API_OFERTAS, (body) , { headers })
  }

  // HttpClien Observable. Petición Delete
  deleteOneOffer(id: string): Observable<FormNewOffer> {
    const headers = { Authorization: `Bearer ${this.getToken()}` }
    return this._http.delete<FormNewOffer>(AppEndPoints.END_POINT_API_OFERTAS + `/${id}`, { headers })
  }

  //  Getter para obtener el token
  getToken(): string {
    return JSON.parse(localStorage.getItem('login')!).id_token
  }

}
