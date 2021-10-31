import { AppEndPoints } from './../endpoints.component';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommAPIService {

  //Sujeto
  private offersList$ = new Subject<Array<any>>()

  //Almacenamiento
  private offersArray: Array<any>

  constructor(private http: HttpClient) {
    this.offersArray = []
  }

/*   //Agregar elementos al array de ofertas
  addToList(elemento: any){
    this.offersArray.push(elemento)
    //Escucha del evento
    this.offersList$.next(this.offersArray)
  }

  //Observable
  getOffers(): Observable<any> {
    return this.offersList$.asObservable()
  } */

  //HttpClient Observable. Petición Get
  getDataOffers(): Observable<any> {
    const URL = AppEndPoints.END_POINT_API_OFERTAS
    return this.http.get(URL)
  }

  //HttpClient Observable. Petición Get/id
  getDataOfferID(id: string): Observable<any> {
    const URL = AppEndPoints.END_POINT_API_OFERTAS + `/${id}`
    console.log(URL)
    return this.http.get(URL)
  }




}
