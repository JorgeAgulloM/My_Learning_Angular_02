import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';

@Component({
  selector: 'app-offerslist',
  templateUrl: './offerlist.component.html',
  styleUrls: ['./offerlist.component.css']
})
export class OfferListComponent implements OnInit {

  private arrayDataOffers: Array<any>
  private modeAmin: boolean

  constructor(
    private _comApiSrv: CommAPIService,
    private _router: Router,
    private _actdRouter: ActivatedRoute
    ) {
    this.arrayDataOffers = new Array<any>()
    this.modeAmin = false
  }

  ngOnInit(): void {

    this.getDataOffers()
    this.setModeAdmin(this._comApiSrv.getUserState())
  }

  getArrayDataOffers(): Array<any> {
    return this.arrayDataOffers
  }

  //Suscripción para ver todas las ofertas
  getDataOffers(): void{
    this._comApiSrv.getDataOffers().subscribe(
      response => {
        this.arrayDataOffers = response
        console.log(JSON.stringify(response))
      },
      error => {
        console.log('ERROR Http = ' + JSON.stringify(error))
      }
    )
  }

  //  Suscripción para eliminar una oferta
  deleteOneOffer(id: string): void {
    // if (this.getConfirmAdminLoged()){
    this._comApiSrv.deleteOneOffer(id).subscribe(
      response => {
        this.getDataOffers()
        console.log(response)
      },
      error => {
        console.log(error)
        alert(error)

      }
    )

  }


  goToFullOffer(id: string): void {
    console.log('GoToFullOffer' + id)
    this._router.navigate(['home/offer', id])
  }

  getModeAmin(): boolean {
    console.log('Consultado estado de usuario')
    return this.modeAmin;
  }

  private setModeAdmin(value: boolean): void {
    this.modeAmin = value
  }


}
