import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';

@Component({
  selector: 'app-ofertacompleta',
  templateUrl: './ofertacompleta.component.html',
  styleUrls: ['./ofertacompleta.component.css']
})
export class OfertacompletaComponent implements OnInit {

  private dataOffer: Array<any>

  constructor(
    private _comApiSrv: CommAPIService,
    private _actdRoute: ActivatedRoute
    ) {
      this.dataOffer = new Array<any>()
     }

  ngOnInit(): void {
    this.getDataOfferID(this._actdRoute.snapshot.paramMap.get('id')!)
  }

  getDataOffer(value: number): string {
    return this.dataOffer[value]
  }

  //Suscripciçón
  getDataOfferID(id: string): void{
    this._comApiSrv.getDataOfferID(id).subscribe(
      response =>{
        this.dataOffer = response
      },
      error => {
        this.dataOffer = error
      }
    )
  }
}
