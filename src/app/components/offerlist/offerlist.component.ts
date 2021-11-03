import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
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
    private _actdRouter: ActivatedRoute,
    private _login: LoginComponent
    ) {
    this.arrayDataOffers = new Array<any>()
    this.modeAmin = false
  }

  ngOnInit(): void {

    this.getDataOffers()
    this.setModeAdmin(this._comApiSrv.getAdminState())
  }

  getArrayDataOffers(): Array<any> {
    return this.arrayDataOffers
  }

  //Suscripción para ver todas las ofertas
  getDataOffers(): void{
    this._comApiSrv.getDataOffers().subscribe(
      response => {
        this.arrayDataOffers = response
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
      },
      error => {
        alert(error)

      }
    )

  }


  goToFullOffer(id: string): void {
    this._router.navigate(['home/offer', id])
  }

  gotToNewOffer(): void {
    this._login.gotToNewOffer()
  }

  getModeAmin(): boolean {
    return this.modeAmin;
  }

  private setModeAdmin(value: boolean): void {
    this.modeAmin = value
  }


}
