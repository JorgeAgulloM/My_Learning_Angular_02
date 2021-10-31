import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';

@Component({
  selector: 'app-listaofertas',
  templateUrl: './listaofertas.component.html',
  styleUrls: ['./listaofertas.component.css']
})
export class ListaofertasComponent implements OnInit {

  private arrayDataOffers: Array<any>

  constructor(
    private _comApiSrv: CommAPIService,
    private _router: Router
    ) {
    this.arrayDataOffers = new Array<any>()
  }

  ngOnInit(): void {
    this.getDataOffers()
  }

  getArrayDataOffers(): Array<any> {
    return this.arrayDataOffers
  }

  //Suscripciçón
  getDataOffers(): void{
    this._comApiSrv.getDataOffers().subscribe(
      response =>{
        this.arrayDataOffers = response
        console.log(JSON.stringify(response))
      },
      error => {
        console.log('ERROR Http = ' + JSON.stringify(error))
      }
    )
  }

  goToFullOffer(id: string): void {
    this._router.navigate(['home/oferta', id])
  }
}
