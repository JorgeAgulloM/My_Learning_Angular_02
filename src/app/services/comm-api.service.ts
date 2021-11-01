import { FormLogin } from 'src/app/Models/FormLogin';
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
  //private postId = ArrayBuffer<string>()

  //Almacenamiento
  private offersArray: Array<any>

  constructor(private http: HttpClient) {
    this.offersArray = []
    //this.postId = new ArrayBuffer
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
    return this.http.get(URL)
  }

/*   // Metodo post que funciona
  postDataUserLogin(body: FormLogin): any {
    const headers = {'Content-Type':  'application/json', 'Authorization': 'Bearer my-token'}
    this.http.post<FormLogin>(AppEndPoints.END_POINT_API_AUTH + '?', JSON.stringify(body), {headers}).subscribe(
      Response =>{
        console.log(JSON.stringify(Response))
        return Response
      },
      error => {
        console.log(error)
        return error
      }
    )
  } */

    // Metodo post que funciona
    postDataUserLogin(body: FormLogin): Observable<any> {
      const headers = {'Content-Type':  'application/json', 'Authorization': 'Bearer my-token'}
      return this.http.post<FormLogin>(AppEndPoints.END_POINT_API_AUTH + '?', JSON.stringify(body), {headers})
    }
 /*  postDataUserLogin(body: FormLogin): boolean {
    const URL = AppEndPoints.END_POINT_API_AUTH + '/?'
    console.log(URL)
    if (this.http.post(URL, JSON.stringify(body)).subscribe(data => {
      console.log(data)
    })){
      console.log('Logeado')
      return true
    } else {
      console.log('maaaaaal')
      return false
    }
  }

  postData(body: FormLogin): void {
    const URL = AppEndPoints.END_POINT_API_AUTH + '/?'
    const headers = {'Content-Type':  'application/json', 'Authorization': 'Bearer my-token'}
    this.http.post(URL, JSON.stringify(body), {headers}).subscribe(data => {
      console.log(data)
    })
  } */




}
