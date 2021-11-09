import { AppEndPoints } from './../endpoints.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormImages } from '../Models/FormImages';


@Injectable({
  providedIn: 'root'
})
export class ApiImagesService {

  private arrayImages: Array<string> = new Array<string>()

  constructor(private _http: HttpClient
    ) { }

  getImagesAPI(): Observable<FormImages> {
    //return this._http.get<FormImages>(AppEndPoints.END_POINT_API_IMAGES+encodeURIComponent('business'))
    return this._http.get<FormImages>(AppEndPoints.END_POINT_API_IMAGES+encodeURIComponent('computer'))
  }

  getImages():void {
    this.getImagesAPI().subscribe(
      response => {
        console.log(JSON.stringify(response.hits))

        Object.entries(response.hits).forEach(
          ([key, value]) => this.arrayImages.push(value.largeImageURL)
        );

        console.log('Array: ', this.arrayImages)
      },
      error => {
        console.log(JSON.stringify(error))
      }
    )
  }


  getRandomImage(n: number): string {

    if (n > this.arrayImages.length) {
      n = this.arrayImages.length -1
    }

    return this.arrayImages[n]
  }

}
