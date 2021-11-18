import { AppEndPoints } from './../endpoints.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormImages } from '../Models/FormImages';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ApiImagesService {

  private arrayImages: Array<string> = new Array<string>()

  constructor(private _http: HttpClient
    ) {
      //Para evitar que el array esté vación al consultarlo, cargo la primera foto de forma manual.
      this.arrayImages.push('https://pixabay.com/get/g40e3fdb0c5304faeb9f795f6b68a0e2eb706dc2ded6fd4fdae026945804adcd1c6e337b175595243e7e066dce68a0ce4b59dc10ca7e15b91ddc9be1a38b2d8a7_1280.jpg"')
    }

  //Obtiene las imagenes del API de pixabay.com
  getImagesAPI(): Observable<FormImages> {
    //return this._http.get<FormImages>(AppEndPoints.END_POINT_API_IMAGES+encodeURIComponent('business'))
    return this._http.get<FormImages>(AppEndPoints.END_POINT_API_IMAGES+encodeURIComponent('computer'))
  }

  //Solicita la obtención de las imagenes del API y las guarda en el array.
  getImages():void {
    this.getImagesAPI().subscribe(
      //Si la respuesta es correcta...
      response => {
        //...se almacenan las imagenes en el array
        Object.entries(response.hits).forEach(
          ([key, value]) => this.arrayImages.push(value.largeImageURL)
        );
      },
      //Si falla la petición se muestra un mensaje de error
      error => {
      //...se muestra información en pantalla
      Swal.fire({
        icon: 'error',
        title: `Oops... Error ${error.status}`,
        text: 'Error al obtener las imagenes del API pixabay.com'
      })
      }
    )
  }

  //Escoge una de las imagenes con el id del parámetro
  getRandomImage(n: number): string {
    //Si el nñumero que llega por parámetro es mayor que el length del array, se usa la última imagen
    if (n > this.arrayImages.length) {
      n = this.arrayImages.length -1
    }
    console.log(this.arrayImages)
    return this.arrayImages[n]
  }

}
