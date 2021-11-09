import { Component, OnInit } from '@angular/core';
import { ApiImagesService } from './services/api-images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ofertasEmpleo';


  constructor(
    private _srvImages: ApiImagesService
    ){}

  ngOnInit(): void {
    this._srvImages.getImages()
  }

}
