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
   /*  this.setModeAmin() */
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
        console.log(response)
      },
      error => {
        console.log(error)
        alert(error)
        /* this.modeAmin = false
        this._router.navigate(['home']) */
      }
    )
    /* } else {
      alert("El usuario ha perdido la acreditación, volviendo a home...")
      this.modeAmin = false
      this._router.navigate(['home'])
    } */
  }

/*   getConfirmAdminLoged(): boolean {
    return this._comApiSrv.getUserLoged()
  } */

  goToFullOffer(id: string): void {
    console.log('GoToFullOffer' + id)
    this._router.navigate(['home/offer', id])
  }

  public getModeAmin(): boolean {
    return this.modeAmin;
  }

/*   public setModeAmin(): void {
      this.modeAmin = this.getConfirmAdminLoged()
      console.log(this.modeAmin)
  } */
}
