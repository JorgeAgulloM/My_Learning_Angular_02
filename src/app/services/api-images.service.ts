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
    ) { }

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
        text: 'Error al obtener las imagenes del API pixabay.com',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      }
    )
  }

  //Escoge una de las imagenes con el id del parámetro
  getRandomImage(n: number): string {
    //En caso de error y que no haya imagenes en el array, se carga una por defecto
    if (this.arrayImages.length == 0){
      return require('../../assets/BackGroundInit.jpg').default as string
    }
    //Si el nñumero que llega por parámetro es mayor que el length del array, se usa la última imagen
    if (n > this.arrayImages.length) {
      n = this.arrayImages.length -1
    }

    return this.arrayImages[n]
  }

}
